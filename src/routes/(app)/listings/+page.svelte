<script lang="ts">
	import ListingCard from '$lib/components/ListingCard.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import type { PageData } from './$types';
	import RangeSlider from 'svelte-range-slider-pips';
	import numbro from 'numbro';
	import { onMount } from 'svelte';

	export let data: PageData;
	let listings = data.listings;

	import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
	const { GeolocateControl, NavigationControl, ScaleControl } = controls;

	listings = listings.map((listing) => {
		if (typeof listing?.location === 'string') listing.location = JSON.parse(listing.location);
		return listing;
	});

	// function that filters listings to get the bounding box from the coordinates in the location key
	function getBbox(listings) {
		const coords = listings.reduce((result, listing) => {
			if (listing?.location?.type === 'Point') result.push(listing.location.coordinates);
			return result;
		}, []);
		const lngs = coords.map((coord) => coord[0]);
		const lats = coords.map((coord) => coord[1]);
		const minLng = Math.min(...lngs);
		const maxLng = Math.max(...lngs);
		const minLat = Math.min(...lats);
		const maxLat = Math.max(...lats);
		return [
			[minLng, minLat],
			[maxLng, maxLat],
		];
	}
	const bbox = getBbox(listings);
	const center = [(bbox[0][0] + bbox[1][0]) / 2, (bbox[0][1] + bbox[1][1]) / 2];

	// fit map to marker's bounding box
	let mapComponent;
	const initMap = () => {
		mapComponent.resize(); // resize map to fit container
		mapComponent.fitBounds(bbox, {
			padding: { top: 70, bottom: 70, left: 70, right: 70 },
		});
	};

	const maxPrice = 2;
	const minPrice = 0;
	let priceSliderRange = [minPrice, maxPrice];
	$: [minPriceSlider, maxPriceSlider] = priceSliderRange;

	const maxAcres = 1000;
	const minAcres = 0;
	let acresSliderRange = [minAcres, maxAcres];
	$: [minAcresSlider, maxAcresSlider] = acresSliderRange;

	let showFilterDropdown = false;
</script>

<div class="flex h-[calc(100vh-64px)]">
	<div class="grow flex flex-col">
		<menu id="sliders" class="flex justify-around items-center py-2 border-b-2">
			<li class="relative w-1/4">
				<div class="flex justify-between items-baseline">
					<label for="steps-range" class="label-texts">Price</label>
					<span class="caption-text"
						>${minPriceSlider}{minPriceSlider < 1 ? 'K' : 'M'} - ${maxPriceSlider}{maxPriceSlider <
						1
							? 'K'
							: 'M'}{maxPriceSlider === maxPrice ? '+' : ''}</span
					>
				</div>
				<RangeSlider
					min="{minPrice}"
					max="{maxPrice}"
					step="{0.01}"
					range
					pushy
					bind:values="{priceSliderRange}"
				/>
				<!-- <div class="flex justify-between">
					<span>${minPriceDisplay}</span>
					<span>${maxPriceDisplay}</span>
				</div> -->
			</li>
			<li class="relative w-1/4">
				<div class="flex justify-between items-baseline">
					<label for="steps-range" class="label-texts">Acres</label>
					<span class="caption-text"
						>{numbro(minAcresSlider).format({ thousandSeparated: true })} - {numbro(
							maxAcresSlider,
						).format({ thousandSeparated: true })}{maxAcresSlider === maxAcres
							? '+'
							: ''} acres</span
					>
				</div>
				<RangeSlider
					min="{minAcres}"
					max="{maxAcres}"
					step="{1}"
					range
					pushy
					bind:values="{acresSliderRange}"
				/>
				<!-- <div class="flex justify-between">
					<span>{numbro(minAcresSlider).format({ thousandSeparated: true })}</span>
					<span>{numbro(maxAcresSlider).format({ thousandSeparated: true })}</span>
				</div> -->
			</li>
			<li class="relative">
				<button
					class="text-label font-semibold text-primary-600 flex"
					on:click="{() => (showFilterDropdown = !showFilterDropdown)}"
					>Filter By<iconify-icon
						inline
						icon="material-symbols:keyboard-arrow-down"
						width="24"></iconify-icon></button
				>
				{#if showFilterDropdown}
					<form class="absolute flex bg-white right-0 z-10 rounded-lg py-4 divide-x">
						<fieldset class="flex flex-col whitespace-nowrap gap-2 px-4">
							<span class="font-semibold">Land Type</span>
							<InputField name="hunting" title="Hunting" />
							<InputField name="home" title="Home" />
							<InputField name="farm-and-ranch" title="Farm & Ranch" />
						</fieldset>
						<fieldset class="flex flex-col whitespace-nowrap gap-2 px-4">
							<span class="font-semibold">Availability</span>
							<InputField name="available" title="Available" />
							<InputField name="under-contract" title="Under Contract" />
							<InputField name="sold" title="Sold" />
						</fieldset>
					</form>
				{/if}
			</li>
		</menu>
		<Map
			accessToken="pk.eyJ1IjoibGFuZGxpc3Rpbmdwcm8iLCJhIjoiY2tuNjQ2djRxMGFkczJ3cXBxcmd4a2VnYSJ9.1bw7SeYN6vx3TIj849l5CA"
			bind:this="{mapComponent}"
			on:ready="{() => initMap()}"
			center="{center}"
			zoom="2"
			options="{{ scrollZoom: false }}"
		>
			{#each listings as listing}
				{#if listing.location}
					<Marker
						lng="{listing.location.coordinates[0]}"
						lat="{listing.location.coordinates[1]}"
						color="rgb(255,255,255)"
						label="some marker label"
						popupClassName="class-name"
					>
						<div class="" slot="popup">
							<div>
								<span class="accent-text"
									>{listing.address.city}, {listing.address.state}</span
								>
								<h3 class="mb-2 subtitle-text text-primary-600">{listing.title}</h3>
							</div>
							<div class="flex items-center gap-1 main-text">
								<span
									>{numbro(listing.acres).format({ thousandSeparated: true })} acres</span
								>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3"
									preserveAspectRatio="xMidYMid meet"
									viewBox="0 0 32 32"
									><circle cx="16" cy="16" r="8" fill="currentColor"
									></circle></svg
								>

								<span
									>{numbro(listing.price).formatCurrency({
										thousandSeparated: true,
									})}</span
								>
							</div>
						</div>
					</Marker>
				{/if}
			{/each}
			<NavigationControl />
			<ScaleControl />
		</Map>
	</div>

	<div class="overflow-scroll w-[600px] border-l-2">
		<menu class="flex justify-between sticky top-0 z-40 bg-slate-100 px-6 py-4">
			<li class="text-primary-600 font-semibold"><span>{listings.length}</span> listings</li>
			<li>
				<div class="inset-y-0 right-0 flex items-center">
					<label for="currency" class="sr-only">Currency</label>
					<select
						id="currency"
						name="currency"
						class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 main-text"
					>
						<option value="">Date: New to Old</option>
						<option value="">Date: Old to New</option>
						<option value="">Acres: Small to Large</option>
						<option value="">Acres: Large to Small</option>
						<option value="">Price: Low to High</option>
						<option value="">Price: High to Low</option>
						<option value="">Name: A to Z</option>
						<option value="">Name: Z to A</option>
					</select>
				</div>
			</li>
		</menu>
		<div class="p-6 grid grid-cols-1 grid-flow-row auto-rows-fr gap-6">
			{#each listings as listing}
				<ListingCard listing="{listing}" extraClasses="" horizontal="true" />
			{/each}
		</div>
	</div>
</div>

<style>
	#sliders {
		--range-slider: #d7dada; /* slider main background color */
		--range-handle-inactive: theme(colors.neutral.400); /* inactive handle color */
		--range-handle: var(--range-handle-inactive); /* non-focussed handle color */
		--range-handle-focus: var(--range-handle-inactive); /* focussed handle color */
		--range-handle-border: var(--range-handle-inactive);
		--range-range-inactive: theme(colors.primary.400); /* inactive range bar background color */
		--range-range: var(--range-range-inactive); /* active range bar background color */
		--range-float-inactive: var(
			--range-handle-inactive
		); /* inactive floating label background color */
		--range-float: var(--range-handle-focus); /* floating label background color */
		--range-float-text: white; /* text color on floating label */
	}

	.rangeSlider .rangeHandle .rangeNub {
		background-color: black !important;
		color: black !important;
	}

	.rangeSlider > .rangeHandle {
		background-color: black !important;
		color: black !important;
	}

	.mapboxgl-canvas {
		width: 200px;
		height: 600px;
		/* max-width: 100%;
		max-height: 100%; */
	}
</style>

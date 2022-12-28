<script lang="ts">
	import ListingCard from '$lib/components/ListingCard.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import type { PageData } from './$types';
	import RangeSlider from 'svelte-range-slider-pips';
	import numbro from 'numbro';
	import type { Listings } from '$lib/types/Listings';
	import { writable } from 'svelte/store';

	// Create a writable store to hold the value of the range input

	export let data: PageData;
	interface MapListing extends Listings {
		visible: boolean;
	}
	let listings: MapListing[] = data.listings;

	import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
	const { GeolocateControl, NavigationControl, ScaleControl } = controls;

	type Coord = [number, number];
	let coords: Coord[] = [];
	listings = listings.map((listing) => {
		if (typeof listing?.location === 'string') listing.location = JSON.parse(listing.location);
		if (listing?.location?.type === 'Point') coords.push(listing.location.coordinates);
		listing.visible = true;
		return listing;
	});

	// function that filters listings to get the bounding box from the coordinates in the location key
	function getBbox(coords: Coord[]): Coord[] {
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
	const bbox = getBbox(coords);
	const center: Coord = [(bbox[0][0] + bbox[1][0]) / 2, (bbox[0][1] + bbox[1][1]) / 2];

	// fit map to marker's bounding box
	let mapComponent: Map;
	const initMap = () => {
		mapComponent.resize(); // resize map to fit container
		mapComponent.fitBounds(bbox, {
			padding: { top: 70, bottom: 70, left: 70, right: 70 },
		});
	};

	const [minPrice, maxPrice] = [0, 2000000];
	let priceRange = [minPrice, maxPrice];
	let [minPriceValue, maxPriceValue] = priceRange;

	const [minAcres, maxAcres] = [0, 100];
	let acresRange = [minAcres, maxAcres];
	let [minAcresValue, maxAcresValue] = acresRange;

	function filterListings(
		listings: MapListing[],
		minPriceValue: number,
		maxPriceValue: number,
		minAcresSlider: number,
		maxAcresSlider: number,
	) {
		listings = listings.map((listing) => {
			const price = listing.price;
			const acres = listing.acres;
			const inPriceRange =
				(price >= minPriceValue || minPriceValue == minPrice) &&
				(price <= maxPriceValue || maxPriceValue == maxPrice);
			const inAcresRange =
				(acres >= minAcresSlider || minAcresSlider == minAcres) &&
				(acres <= maxAcresSlider || maxAcresSlider == maxAcres);
			listing.visible = inPriceRange && inAcresRange;
			return listing;
		});
		// console.log(listings);
		return listings;
	}

	$: listings = filterListings(
		listings,
		minPriceValue,
		maxPriceValue,
		minAcresValue,
		maxAcresValue,
	);

	numbro.zeroFormat('0');

	function changeOrder(elem: EventTarget) {
		const target = elem as HTMLSelectElement;
		const selected = target.value;
		// sort listings by price, acres, date and alphabetical order
		if (selected === 'low-to-high') {
			listings = listings.sort((a, b) => a.price - b.price);
		} else if (selected === 'high-to-low') {
			listings = listings.sort((a, b) => b.price - a.price);
		} else if (selected === 'small-to-large') {
			listings = listings.sort((a, b) => a.acres - b.acres);
		} else if (selected === 'large-to-small') {
			listings = listings.sort((a, b) => b.acres - a.acres);
		} else if (selected === 'new-to-old') {
			listings = listings.sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
			);
		} else if (selected === 'old-to-new') {
			listings = listings.sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
			);
		} else if (selected === 'a-to-z') {
			listings = listings.sort((a, b) => a.title.localeCompare(b.title));
		} else if (selected === 'z-to-a') {
			listings = listings.sort((a, b) => b.title.localeCompare(a.title));
		}
		console.log(listings);
	}
</script>

<div class="flex h-[calc(100vh-64px)]">
	<div class="grow flex flex-col">
		<menu id="sliders" class="flex justify-around items-center py-2 border-b-2">
			<li class="relative w-1/3">
				<div class="flex justify-between items-baseline">
					<label for="steps-range" class="label-texts">Price</label>
					<span class="caption-text"
						>${numbro(priceRange[0]).format({ average: true, totalLength: 2 })} - ${numbro(
							priceRange[1],
						).format({ average: true, totalLength: 2 })}{priceRange[1] === maxPrice
							? '+'
							: ''}</span
					>
				</div>
				<RangeSlider
					min="{minPrice}"
					max="{maxPrice}"
					step="{1000}"
					range
					pushy
					bind:values="{priceRange}"
					on:stop="{(event) => ([minPriceValue, maxPriceValue] = event.detail.values)}"
				/>
			</li>
			<li class="relative w-1/3">
				<div class="flex justify-between items-baseline">
					<label for="steps-range" class="label-texts">Acres</label>
					<span class="caption-text"
						>{numbro(acresRange[0]).format({ thousandSeparated: true })} - {numbro(
							acresRange[1],
						).format({ thousandSeparated: true })}{acresRange[1] === maxAcres
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
					bind:values="{acresRange}"
					on:stop="{(event) => ([minAcresValue, maxAcresValue] = event.detail.values)}"
				/>
			</li>
			<!-- <li class="relative">
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
			</li> -->
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
				{#if listing.location && listing.visible}
					<Marker
						lng="{listing.location.coordinates[0]}"
						lat="{listing.location.coordinates[1]}"
						color="rgb(0,255,255)"
						popupOptions="{{ closeButton: false, focusAfterOpen: false }}"
					>
						<div class="" slot="popup">
							<!-- <div>
								<span class="accent-text"
									>{listing.address.city}, {listing.address.state}</span
								>
								<h3 class="mb-2 subtitle-text text-primary-600">{listing.title}</h3>
							</div>
							<div class="flex items-center gap-1 main-text">
								<span
									>{numbro(listing.acres).format({ thousandSeparated: true })}
									acres</span
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
							</div> -->
							<ListingCard
								listing="{listing}"
								extraClasses="min-h-[150px]"
								horizontal="{false}"
							/>
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
			<li class="text-primary-600 font-semibold"
				><span>{listings.filter((obj) => obj.visible).length}</span> listings</li
			>
			<li>
				<div class="inset-y-0 right-0 flex items-center">
					<label for="currency" class="sr-only">Currency</label>
					<select
						id="currency"
						name="currency"
						class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 main-text"
						on:change="{(e) => e.target && changeOrder(e.target)}"
					>
						<option value="new-to-old">Date: New to Old</option>
						<option value="old-to-new">Date: Old to New</option>
						<option value="small-to-large">Acres: Small to Large</option>
						<option value="large-to-small">Acres: Large to Small</option>
						<option value="low-to-high">Price: Low to High</option>
						<option value="high-to-low">Price: High to Low</option>
						<option value="a-to-z">Name: A to Z</option>
						<option value="z-to-a">Name: Z to A</option>
					</select>
				</div>
			</li>
		</menu>
		<div class="p-6 grid grid-cols-1 grid-flow-row gap-6">
			{#each listings as listing}
				{#if listing.visible}
					<ListingCard
						listing="{listing}"
						extraClasses="min-h-[150px]"
						horizontal="{true}"
					/>
				{/if}
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

	:global(.mapboxgl-popup-content) {
		border-radius: theme(borderRadius.xl) !important;
		padding: 0 !important;
	}
</style>

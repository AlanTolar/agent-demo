<script lang="ts">
	import ListingCard from '$lib/components/ListingCard.svelte';
	import type { PageData } from './$types';
	import type { Listing } from '$lib/types/Listing';
	import Slider from '$lib/components/Slider.svelte';
	import RadioField from '$lib/components/RadioField.svelte';
	import DropdownOptions from '$lib/components/DropdownOptions.svelte';
	import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
	const { GeolocateControl, NavigationControl, ScaleControl } = controls;
	import { onMount } from 'svelte';
	import { getBreakpoint } from '$lib/utils/getBreakpoint';

	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { getBbox } from '$lib/utils/mapHelpers';

	let breakpoint: string;
	onMount(() => {
		function handleResize() {
			const breakpointCheck = getBreakpoint();
			if (breakpoint !== breakpointCheck) {
				breakpoint = breakpointCheck;
				console.log('breakpoint: ', breakpoint);
			}
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	// Create a writable store to hold the value of the range input

	export let data: PageData;
	interface MapListing extends Listing {
		visible: boolean;
	}
	let listings: MapListing[] = data.listings;

	type Coord = [number, number];
	let coords: Coord[] = [];
	listings = listings.map((listing) => {
		if (typeof listing?.location === 'string') listing.location = JSON.parse(listing.location);
		if (listing?.location?.type === 'Point') coords.push(listing.location.coordinates);
		listing.visible = true;
		return listing;
	});

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

	const priceFilterCeiling = 500000;
	const minPrice = listings.reduce((min, p) => {
		if (p.price > priceFilterCeiling) return priceFilterCeiling - 1;
		return p.price < min ? p.price : min;
	}, listings[0].price);
	const maxPrice = listings.reduce((max, p) => {
		if (p.price > priceFilterCeiling) return priceFilterCeiling;
		return p.price > max ? p.price : max;
	}, listings[0].price);
	let [minPriceValue, maxPriceValue] = [minPrice, maxPrice];

	const acresFilterCeiling = 500;
	const minAcres = listings.reduce((min, p) => {
		if (p.acres > acresFilterCeiling) return acresFilterCeiling - 1;
		return p.acres < min ? p.acres : min;
	}, listings[0].acres);
	const maxAcres = listings.reduce((max, p) => {
		if (p.acres > acresFilterCeiling) return acresFilterCeiling;
		return p.acres > max ? p.acres : max;
	}, listings[0].acres);
	let [minAcresValue, maxAcresValue] = [minAcres, maxAcres];

	function filterListings(
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
	}

	$: filterListings(minPriceValue, maxPriceValue, minAcresValue, maxAcresValue);
	$: numListings = listings.filter((listing) => listing.visible).length;

	let selectedView: 'map' | 'list' | 'filter' = 'map';
	$: mobileView = ['sm', 'md'].includes(breakpoint);

	let landTypeCheckboxes = [
		{ name: 'hunting', title: 'Hunting', checked: false },
		{ name: 'home', title: 'Home', checked: false },
		{ name: 'farm-and-ranch', title: 'Farm & Ranch', checked: false },
	];
	let availabilityCheckboxes = [
		{ name: 'available', title: 'Available', checked: false },
		{ name: 'under-contract', title: 'Under Contract', checked: false },
		{ name: 'sold', title: 'Sold', checked: false },
	];
</script>

<div class="h-[calc(100vh-64px-50px)] md:h-[calc(100vh-64px)] flex flex-row grow">
	<div class="grow flex flex-col">
		<div
			class="{selectedView === 'filter' && mobileView
				? ''
				: 'hidden'} text-primary-600 font-semibold px-6 py-2 whitespace-nowrap"
			><span>{numListings}</span> listings</div
		>
		<menu
			class="{selectedView === 'filter' && mobileView ? '' : 'hidden'} {mobileView
				? 'relative overflow-scroll'
				: ''} flex flex-col md:flex md:flex-row md:justify-between md:items-center h-full md:h-[80px] gap-6 md:gap-16 bg-neutral-100 border-b-2 p-6"
		>
			<li class="w-full md:w-5/12">
				<Slider
					min="{minPrice}"
					max="{maxPrice}"
					name="Price"
					prefix="$"
					on:change="{(e) => {
						minPriceValue = e.detail.values[0];
						maxPriceValue = e.detail.values[1];
					}}"
				/>
			</li>
			<li class="w-full md:w-5/12">
				<Slider
					min="{minAcres}"
					max="{maxAcres}"
					name="Acres"
					on:change="{(e) => {
						minAcresValue = e.detail.values[0];
						maxAcresValue = e.detail.values[1];
					}}"
				/>
			</li>
			<li class="whitespace-nowrap">
				<DropdownOptions
					name="Filter By"
					escape="{selectedView === 'filter' && mobileView}"
				>
					<form
						class="md:absolute flex flex-col md:flex-row bg-neutral-100 right-0 z-40 rounded-lg md:divide-x"
					>
						<fieldset class="flex flex-col whitespace-nowrap gap-2 p-4">
							<span class="font-semibold">Land Type</span>
							{#each landTypeCheckboxes as item}
								<div>
									<input
										type="checkbox"
										bind:checked="{item.checked}"
										id="{item.name}"
									/>
									<label class="ml-1" for="{item.name}">{item.title}</label>
								</div>
							{/each}
						</fieldset>
						<fieldset class="flex flex-col whitespace-nowrap gap-2 p-4">
							<span class="font-semibold">Availability</span>
							{#each availabilityCheckboxes as item}
								<div>
									<input
										type="checkbox"
										bind:checked="{item.checked}"
										id="{item.name}"
									/>
									<label class="ml-1" for="{item.name}">{item.title}</label>
								</div>
							{/each}
						</fieldset>
					</form>
				</DropdownOptions>
			</li>
		</menu>
		<div
			class="{selectedView === 'map' && mobileView ? '' : 'hidden'} md:block h-full relative"
		>
			<div
				class="absolute md:hidden top-1 left-3 z-10 text-primary-600 font-semibold px-3 p-1 whitespace-nowrap bg-neutral-100 rounded-full"
				><span>{numListings}</span> listings</div
			>
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
	</div>

	<div
		class="{selectedView === 'list' && mobileView
			? ''
			: 'hidden'} md:block relative overflow-scroll w-full md:w-1/3 xl:w-[500px] border-l-2 bg-neutral-200 "
	>
		<menu
			class="flex sticky top-0 z-40 justify-between items-center md:h-[80px] gap-16 bg-neutral-100 border-b-2 p-6 py-2 md:p-6"
		>
			<li class="text-primary-600 font-semibold w-[87px]"
				><span>{numListings}</span> listings</li
			>
			<li>
				<DropdownOptions name="Sort By">
					<form class="absolute bg-white right-0 z-40 rounded-lg p-4 whitespace-nowrap">
						<RadioField
							name="order"
							title="Date: New to Old"
							checked="{true}"
							on:change="{() => {
								listings = listings.sort(
									(a, b) =>
										new Date(b.date).getTime() - new Date(a.date).getTime(),
								);
							}}"
						/>
						<RadioField
							name="order"
							title="Date: Old to New"
							on:change="{() => {
								listings = listings.sort(
									(a, b) =>
										new Date(a.date).getTime() - new Date(b.date).getTime(),
								);
							}}"
						/>
						<RadioField
							name="order"
							title="Acres: Small to Large"
							on:change="{() =>
								(listings = listings.sort((a, b) => a.acres - b.acres))}"
						/>
						<RadioField
							name="order"
							title="Acres: Large to Small"
							on:change="{() =>
								(listings = listings.sort((a, b) => b.acres - a.acres))}"
						/>
						<RadioField
							name="order"
							title="Price: Low to High"
							on:change="{() =>
								(listings = listings.sort((a, b) => a.price - b.price))}"
						/>
						<RadioField
							name="order"
							title="Price: High to Low"
							on:change="{() =>
								(listings = listings.sort((a, b) => b.price - a.price))}"
						/>
						<RadioField
							name="order"
							title="Name: A to Z"
							on:change="{() =>
								(listings = listings.sort((a, b) =>
									a.title.localeCompare(b.title),
								))}"
						/>
						<RadioField
							name="order"
							title="Name: Z to A"
							on:change="{() =>
								(listings = listings.sort((a, b) =>
									b.title.localeCompare(a.title),
								))}"
						/>
					</form>
				</DropdownOptions>
			</li>
		</menu>
		<div class="p-6 grid grid-cols-1 grid-flow-row">
			{#each listings as listing (listing.date)}
				<div animate:flip="{{ delay: 0, duration: 500, easing: quintOut }}">
					{#if listing.visible}
						<div class="py-3">
							<ListingCard
								listing="{listing}"
								extraClasses="hidden md:max-xl:block"
								horizontal="{false}"
							/>
							<ListingCard
								listing="{listing}"
								extraClasses="min-h-[130px] md:max-xl:hidden"
								horizontal="{true}"
							/>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<menu
	class="md:hidden flex justify-center items-center h-[50px] gap-16 bg-neutral-200 border-b-2 px-8"
	role="group"
>
	<li>
		<input
			type="radio"
			id="map-btn"
			value="map"
			class="hidden peer/map"
			bind:group="{selectedView}"
		/>
		<label
			for="map-btn"
			class="text-white button-sm drop-shadow-xl shine bg-primary-600 peer-checked/map:bg-neutral-600"
		>
			Map
		</label>
	</li>
	<li>
		<input
			type="radio"
			id="list-btn"
			value="list"
			class="hidden peer/list"
			bind:group="{selectedView}"
		/>
		<label
			for="list-btn"
			class="text-white button-sm drop-shadow-xl shine bg-primary-600 peer-checked/list:bg-neutral-600"
		>
			List
		</label>
	</li>
	<li>
		<input
			type="radio"
			id="filter-btn"
			value="filter"
			class="hidden peer/filter"
			bind:group="{selectedView}"
		/>
		<label
			for="filter-btn"
			class="text-white button-sm drop-shadow-xl shine bg-primary-600 peer-checked/filter:bg-neutral-600"
		>
			Filter
		</label>
	</li>
</menu>

<style>
	:global(.mapboxgl-popup-content) {
		background-color: rgba(0, 0, 0, 0) !important;
		padding: 0 !important;
		box-shadow: none !important;
	}

	:global(.popup) {
		box-shadow: none !important;
	}
</style>

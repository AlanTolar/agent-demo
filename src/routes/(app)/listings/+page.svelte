<script lang="ts">
	import ListingCard from '$lib/components/ListingCard.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import type { PageData } from './$types';
	import numbro from 'numbro';
	import type { Listings } from '$lib/types/Listings';
	import { writable } from 'svelte/store';
	import RangeSlider from 'svelte-range-slider-pips';
	import Slider from '$lib/components/Slider.svelte';

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
	let [minPriceValue, maxPriceValue] = [minPrice, maxPrice];

	const [minAcres, maxAcres] = [0, 100];
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

	numbro.zeroFormat('0');

	let showFilterDropdown = false;

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
	}
</script>

<div class="">
	<menu class="flex justify-around items-center h-[80px] gap-6 bg-neutral-100 border-b-2">
		<li class="relative w-1/5">
			<Slider
				min="{minPrice}"
				max="{maxPrice}"
				name="Price"
				prefix="$"
				on:stop="{(e) => {
					minPriceValue = e.detail.values[0];
					maxPriceValue = e.detail.values[1];
				}}"
			/>
		</li>
		<li class="relative w-1/5">
			<Slider
				min="{minAcres}"
				max="{maxAcres}"
				name="Acres"
				on:stop="{(e) => {
					console.log(e);
					minAcresValue = e.detail.values[0];
					maxAcresValue = e.detail.values[1];
				}}"
			/>
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

		<li>
			<select
				class="h-full rounded-md border-transparent bg-neutral-200 py-0 main-text"
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
		</li>
		<li class="text-primary-600 font-semibold"
			><span>{listings.filter((obj) => obj.visible).length}</span> listings</li
		>
	</menu>

	<div class="flex h-[calc(100vh-64px-80px)]">
		<div class="grow">
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

		<div class="overflow-scroll w-1/3 xl:w-[500px] border-l-2 bg-neutral-200">
			<div class="p-6 grid grid-cols-1 grid-flow-row gap-6">
				{#each listings as listing}
					{#if listing.visible}
						<ListingCard
							listing="{listing}"
							extraClasses="xl:hidden"
							horizontal="{false}"
						/>
						<ListingCard
							listing="{listing}"
							extraClasses="min-h-[130px] max-xl:hidden"
							horizontal="{true}"
						/>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	:global(.mapboxgl-popup-content) {
		border-radius: theme(borderRadius.xl) !important;
		padding: 0 !important;
	}
</style>

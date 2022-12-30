<script lang="ts">
	import ListingCard from '$lib/components/ListingCard.svelte';
	import CheckboxField from '$lib/components/CheckboxField.svelte';
	import type { PageData } from './$types';
	import type { Listings } from '$lib/types/Listings';
	import Slider from '$lib/components/Slider.svelte';
	import RadioField from '$lib/components/RadioField.svelte';
	import DropdownOptions from '$lib/components/DropdownOptions.svelte';
	import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
	import { onMount } from 'svelte';
	import { getBreakpoint } from '$lib/utils/getBreakpoint';

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
	interface MapListing extends Listings {
		visible: boolean;
	}
	let listings: MapListing[] = data.listings;

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
	$: numListings = listings.filter((listing) => listing.visible).length;

	let filterShow = false;
	let mapShow = true;
	let listShow = false;
</script>

<div class="h-[calc(100vh-64px-60px)] md:h-[calc(100vh-64px)] flex flex-row grow">
	<div class="grow flex flex-col">
		<menu
			class="{filterShow
				? ''
				: 'hidden'} md:flex justify-between items-center h-full md:h-[80px] gap-16 bg-neutral-100 border-b-2 p-6"
		>
			<li class="md:w-5/12">
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
			<li class="md:w-5/12">
				<Slider
					min="{minAcres}"
					max="{maxAcres}"
					name="Acres"
					on:stop="{(e) => {
						minAcresValue = e.detail.values[0];
						maxAcresValue = e.detail.values[1];
					}}"
				/>
			</li>
			<li class="whitespace-nowrap">
				<DropdownOptions
					name="Filter By"
					escape="{filterShow && ['sm', 'md'].includes(breakpoint)}"
				>
					<form
						class="md:absolute flex flex-col md:flex-row bg-neutral-100 right-0 z-40 rounded-lg md:divide-x"
					>
						<fieldset class="flex flex-col whitespace-nowrap gap-2 p-4">
							<span class="font-semibold">Land Type</span>
							<CheckboxField name="hunting" title="Hunting" />
							<CheckboxField name="home" title="Home" />
							<CheckboxField name="farm-and-ranch" title="Farm & Ranch" />
						</fieldset>
						<fieldset class="flex flex-col whitespace-nowrap gap-2 p-4">
							<span class="font-semibold">Availability</span>
							<CheckboxField name="available" title="Available" />
							<CheckboxField name="under-contract" title="Under Contract" />
							<CheckboxField name="sold" title="Sold" />
						</fieldset>
					</form>
				</DropdownOptions>
			</li>
		</menu>
		<div class="{mapShow ? '' : 'hidden'} md:block h-full ">
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
		class="{listShow
			? ''
			: 'hidden'} md:block relative overflow-scroll w-full md:w-1/3 xl:w-[500px] border-l-2 bg-neutral-200 "
	>
		<menu
			class="flex sticky top-0 z-40 justify-between items-center h-[80px] gap-16 bg-neutral-100 border-b-2 p-6"
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

<menu
	class="md:hidden flex justify-around items-center h-[60px] gap-16 bg-neutral-100 border-b-2 px-8"
>
	<li>
		<button
			on:click="{() => {
				mapShow = true;
				listShow = false;
				filterShow = false;
			}}"
		>
			Map
		</button>
	</li>
	<li>
		<button
			on:click="{() => {
				mapShow = false;
				listShow = true;
				filterShow = false;
			}}"
		>
			List
		</button>
	</li>
	<li>
		<button
			on:click="{() => {
				mapShow = false;
				listShow = false;
				filterShow = true;
			}}"
		>
			Filter
		</button>
	</li>
</menu>

<style>
	:global(.mapboxgl-popup-content) {
		border-radius: theme(borderRadius.xl) !important;
		padding: 0 !important;
	}
</style>

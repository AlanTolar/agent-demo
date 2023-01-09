<script lang="ts">
	import numbro from 'numbro';
	import { onMount, getContext } from 'svelte';
	import type { PageData } from './$types';
	import type { Listing } from '$lib/types/Listing';
	import type { Agent } from '$lib/types/Agent';

	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	import Icon from '@iconify/svelte';

	import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
	const { GeolocateControl, NavigationControl, ScaleControl } = controls;
	import { getBbox } from '$lib/utils/mapHelpers';

	export let data: PageData;
	let listing: Listing = data.listing;
	let agent: Agent = data.agent;
	// console.log('agent: ', agent);
	// console.log('listing: ', listing);

	let scroll = getContext('scroll');
	$: contentCovered = $scroll !== 0;

	let movingImages = false;
	let mainImgIndex = 0;

	function getImg(i: number): string {
		const imgURL =
			listing?.slideshowImages?.at(i % listing.slideshowImages.length) || '/placeholder.webp';
		return imgURL;
	}

	let slides = [
		{
			id: 1,
			url: getImg(mainImgIndex),
		},
		{
			id: 2,
			url: getImg(mainImgIndex + 1),
		},
		{
			id: 3,
			url: getImg(mainImgIndex + 2),
		},
		{
			id: 4,
			url: getImg(mainImgIndex + 3),
		},
		{
			id: 5,
			url: getImg(mainImgIndex + 4),
		},
	];

	let direction = 'forwards';
	function moveLastToFront(arr) {
		mainImgIndex -= 1;
		direction = 'forwards';

		const lastItem = arr.pop();
		arr.unshift(lastItem);
		slides = arr;

		slides[0].url = getImg(mainImgIndex);
	}
	function moveFrontToEnd(arr) {
		mainImgIndex += 1;
		direction = 'backwards';

		const firstItem = arr.shift();
		arr.push(firstItem);
		slides = arr;

		slides[4].url = getImg(mainImgIndex + 4);
	}

	let formName = '';
	let formEmail = '';
	let formPhone = '';
	let formMessage = '';

	let mainContent: 'photo' | 'video' | 'map' | 'model' = 'map';
	$: console.log('mainContent: ', mainContent);

	// const bbox = getBbox(coords);
	// const center: Coord = [(bbox[0][0] + bbox[1][0]) / 2, (bbox[0][1] + bbox[1][1]) / 2];
	let center: [number, number] = [-97.5, 35.5];
	if (typeof listing?.location === 'string') {
		console.log(listing.location);
		const location = JSON.parse(listing.location);
		if (location?.type === 'Point') {
			center = location.coordinates;
		}
	}

	// fit map to marker's bounding box
	let mapComponent: Map;
	const initMap = () => {
		mapComponent.resize(); // resize map to fit container
		// mapComponent.fitBounds(bbox, {
		// 	padding: { top: 70, bottom: 70, left: 70, right: 70 },
		// });
	};
</script>

<!-- Info Bar -->
<div class="sticky top-0 z-30 {contentCovered ? 'bg-neutral-200' : ''}">
	<div class="h-20 custom-container flex gap-x-10">
		<div
			class="w-full xl:w-8/12 shrink-0 flex justify-between gap-x-10 align-middle whitespace-nowrap flex-wrap"
		>
			<h1 class="self-center heading-text">{listing.title}</h1>

			<div
				class="self-center flex items-center gap-2 lg:gap-4 subtitle-text font-bold flex-wrap"
			>
				<span>{numbro(listing.acres).format({ thousandSeparated: true })} acres</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 32 32"
					><circle cx="16" cy="16" r="8" fill="currentColor"></circle></svg
				>

				<span
					>{numbro(listing.price).formatCurrency({
						thousandSeparated: true,
					})}</span
				>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 32 32"
					><circle cx="16" cy="16" r="8" fill="currentColor"></circle></svg
				>
				<span>{listing.address.city}, {listing.address.state}</span>
			</div>
		</div>
		<div class="hidden xl:block w-4/12 shrink-0"> </div>
	</div>
</div>

<div class="xl:flex relative custom-container gap-10">
	<!-- Left Side -->
	<div class="w-full xl:w-8/12 relative">
		<!-- Image Carousel -->
		{#if mainContent === 'photo'}
			<div class="custom-grid z-20">
				<!-- Left Buttons -->
				<div style="grid-column: 6; padding: 0;">
					<button
						class="absolute top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 p-2 bg-primary-600 disabled:bg-primary-800 rounded-full drop-shadow-xl shine z-20"
						disabled="{movingImages}"
						on:click="{() => moveLastToFront(slides)}"
					>
						<Icon
							icon="material-symbols:arrow-back"
							class="w-5 h-5 text-neutral-200 sm:w-7 sm:h-7 m-auto"
						/>
					</button>
				</div>

				<!-- Right Buttons -->
				<div style="grid-column: 8; padding: 0;">
					<button
						class="absolute top-1/2 -translate-y-1/2 -translate-x-full w-10 h-10 sm:w-12 sm:h-12 p-2 bg-primary-600 disabled:bg-primary-800 rounded-full drop-shadow-xl shine z-20"
						disabled="{movingImages}"
						on:click="{() => moveFrontToEnd(slides)}"
						><Icon
							icon="material-symbols:arrow-forward"
							class="w-5 h-5 text-neutral-200 sm:w-7 sm:h-7 m-auto"
						/></button
					>
				</div>

				<!-- Images -->
				{#each slides as slide, index (slide.id)}
					{@const usedCols = [3, 5, 7, 11, 13]}
					{@const col = usedCols[index]}
					<div
						animate:flip="{{
							delay: 0,
							duration: (d) =>
								(index === 4 && direction === 'backwards') ||
								(index === 0 && direction === 'forwards')
									? 0
									: 700,
							easing: quintOut,
						}}"
						style="grid-column: {col};"
						class="relative"
					>
						<img src="{slide.url}" alt="" />
					</div>
				{/each}
			</div>
		{/if}

		<!-- Video -->
		{#if mainContent === 'video'}
			<div style="grid-column: 7;" class="aspect-w-5 aspect-h-3">
				<iframe
					src="https://www.youtube.com/embed/f2yCa1q3-9w"
					title="The Ocean 4K - Sea Animals for Relaxation, Beautiful Coral Reef Fish in Aquarium (4K Video Ultra HD)"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen></iframe>
			</div>
		{/if}

		<!-- Map -->
		{#if mainContent === 'map'}
			<div style="grid-column: 7;" class="aspect-w-5 aspect-h-3 ">
				<div class="h-full w-full">
					<Map
						accessToken="pk.eyJ1IjoibGFuZGxpc3Rpbmdwcm8iLCJhIjoiY2tuNjQ2djRxMGFkczJ3cXBxcmd4a2VnYSJ9.1bw7SeYN6vx3TIj849l5CA"
						bind:this="{mapComponent}"
						on:ready="{() => initMap()}"
						center="{center}"
						zoom="2"
						options="{{ scrollZoom: false }}"
					>
						<NavigationControl />
						<ScaleControl />
					</Map>
				</div>
			</div>
		{/if}

		<!-- 3D Model -->
		{#if mainContent === 'model'}
			<div style="grid-column: 7;" class="aspect-w-5 aspect-h-3">
				<div class="flex justify-center items-center display-text">
					<iframe
						class="w-full h-full"
						title="3D Model"
						id="model-iframe"
						src="https://www.landlistingpro.com/3d-model/111/display"
						allowfullscreen></iframe>
				</div>
			</div>
		{/if}

		<!-- View Toggle -->
		<div
			class="relative flex flex-wrap justify-center mt-4 md:-mt-6 z-20 gap-1 md:gap-0 mx-auto"
			role="group"
		>
			<button
				type="button"
				class="button  bg-primary-600 text-neutral-200   first:md:rounded-l-lg last:md:rounded-r-lg border-2 -ml-[2px] first:ml-0"
				on:click="{() => (mainContent = 'photo')}"
			>
				<Icon icon="material-symbols:photo-library" width="20" />
				<span class="ml-2">Photos</span>
			</button>
			<button
				type="button"
				class="button  bg-primary-600 text-neutral-200  first:md:rounded-l-lg last:md:rounded-r-lg border-2 -ml-[2px] first:ml-0"
				on:click="{() => (mainContent = 'video')}"
			>
				<Icon icon="material-symbols:video-camera-back" width="20" />
				<span class="ml-2">Video</span>
			</button>
			<button
				type="button"
				class="button  bg-primary-600 text-neutral-200  first:md:rounded-l-lg last:md:rounded-r-lg border-2 -ml-[2px] first:ml-0"
				on:click="{() => (mainContent = 'map')}"
			>
				<Icon icon="material-symbols:map-outline" width="20" />
				<span class="ml-2">Map</span>
			</button>
			<button
				type="button"
				class="button  bg-primary-600 text-neutral-200 first:md:rounded-l-lg last:md:rounded-r-lg border-2 -ml-[2px] first:ml-0"
				on:click="{() => (mainContent = 'model')}"
			>
				<Icon icon="iconoir:3d-select-face" width="20" />
				<span class="ml-2">3D Model</span>
			</button>
		</div>

		<!-- Text Body -->
		<main>
			{#if listing.description}
				<section id="description-section" class="py-10">
					<h3 class="heading-text-sm">Description</h3>
					<div class="mt-4 prose main-paragraph max-w-none">
						{@html listing.description}
					</div>
				</section>
			{/if}
			{#if listing.details}
				<section id="details-section" class="py-10">
					<h3 class="heading-text-sm">Details</h3>
					<div class="mt-4 prose main-paragraph max-w-none">
						{@html listing.details}
					</div>
				</section>
			{/if}
			{#if listing.summary}
				<section id="summary-section" class="py-10">
					<h3 class="heading-text-sm">Summary</h3>
					<div class="mt-4 grid sm:grid-cols-2 gap-6">
						<div class="flex flex-col gap-6">
							<div class="flex">
								<iconify-icon icon="ph:tree-bold" class="py-1 pr-4" width="40"
								></iconify-icon>
								<div>
									{#if listing.summary.featureCategories}
										<h4 class="subtitle-text">Property</h4>
										<div class="mt-2 flex flex-col gap-2">
											{#each listing.summary.featureCategories as feature}
												<div
													><h5 class="font-bold"
														>{feature.featureCategory}</h5
													>
													<p>{feature.features}</p>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							</div>
							<div class="flex">
								<iconify-icon
									icon="majesticons:checkbox-list-detail-line"
									class="py-1 pr-4"
									width="40"></iconify-icon>
								<div>
									{#if listing.summary.landDetails}
										<h4 class="subtitle-text">Land Details</h4>
										<div class="mt-2">
											<p>{listing.summary.landDetails}</p>
										</div>
									{/if}
								</div>
							</div>
							<div class="flex">
								<iconify-icon icon="mingcute:road-line" class="py-1 pr-4" width="40"
								></iconify-icon>
								<div>
									{#if listing.summary.distances}
										<h4 class="subtitle-text">Distances</h4>
										<div class="mt-2">
											{#each listing.summary.distances as distances}
												<p
													>{distances.distance} miles from
													{distances.location}</p
												>
											{/each}
										</div>
									{/if}
								</div>
							</div>
						</div>
						<div class="flex flex-col gap-6">
							<div class="flex">
								<iconify-icon
									icon="eos-icons:pipeline-outlined"
									class="py-1 pr-4"
									width="40"></iconify-icon>
								<div>
									{#if listing.summary.utilities}
										<h4 class="subtitle-text">Utilities</h4>
										<div class="mt-2">
											{#each listing.summary.utilities as utilities}
												<p>{utilities.utility}: {utilities.availability}</p>
											{/each}
										</div>
									{/if}
								</div>
							</div>
							<div class="flex">
								<iconify-icon
									icon="material-symbols:house-outline"
									class="py-1 pr-4"
									width="40"></iconify-icon>
								<div>
									{#if listing.summary.housing}
										<h4 class="subtitle-text">Housing</h4>
										<div class="mt-2">
											<p>{listing.summary.housing}</p>
										</div>
									{/if}
								</div>
							</div>
							<div class="flex">
								<iconify-icon
									icon="material-symbols:trending-up"
									class="py-1 pr-4"
									width="40"></iconify-icon>
								<div>
									{#if listing.summary.improvements}
										<h4 class="subtitle-text">Improvements</h4>
										<div class="mt-2">
											<p>{listing.summary.improvements}</p>
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</section>
			{/if}
			{#if listing.brouchure || listing.location || listing.address.street}
				<section id="further-info-section" class="py-10">
					<h3 class="heading-text-sm">Further Information</h3>
					<div class="mt-4 grid sm:grid-cols-2 gap-6">
						<div class="flex flex-col gap-4 items-center">
							{#if listing.brouchure}
								<a
									href="{listing.brouchure}"
									class="text-white button drop-shadow-xl shine bg-primary-600 min-w-[70%] text-center"
									><iconify-icon inline icon="ic:baseline-download" class="mr-2"
									></iconify-icon>Download Files</a
								>
							{/if}
							{#if listing.location}
								<a
									href="{listing.location}"
									class="text-white button drop-shadow-xl shine bg-primary-600 min-w-[70%] text-center"
									><iconify-icon inline icon="mdi:map-marker" class="mr-2"
									></iconify-icon>Get Directions</a
								>
							{/if}
						</div>
						<div class="flex justify-center">
							<div>
								<p>{listing.address.street || ''}</p>
								<p
									>{listing.address.city || ''}, {listing.address.state || ''}
									{listing.address.postCode || ''}</p
								>
								<p>{listing.address.county || ''}</p>
							</div>
						</div>
					</div>
				</section>
			{/if}
		</main>
	</div>

	<!-- Right Side -->
	<div class="relative w-full xl:w-4/12">
		<!-- Vertical Form -->
		<div
			class="bg-neutral-200 sticky {contentCovered
				? 'top-[100px]'
				: 'top-[80px]'} text-black p-10 rounded-[4%] drop-shadow-lg shine-lg mb-10 max-w-[600px] mx-auto z-30"
		>
			<div class="grid grid-cols-3">
				<div class="col-span-1">
					<div class="aspect-w-1 aspect-h-1">
						<img class="object-cover" src="{agent?.image}" alt="" />
					</div>
				</div>
				<div class="col-span-2 pl-10 flex flex-col gap-4">
					<div>
						<h2 class="heading-text">{agent?.name ?? ''}</h2>
						<p class="subtitle-text">{agent?.phone ?? ''}</p>
					</div>
					{#if listing.agent}
						<a
							class="label-text underline text-neutral-600 font-semibold"
							href="/agents/{listing?.agent}">View Profile</a
						>
					{/if}
				</div>
			</div>
			<form class="mt-10 flex flex-col gap-6" autocomplete="off">
				<input
					class="text-input"
					placeholder="Full Name"
					type="text"
					bind:value="{formName}"
				/>
				<input
					class="text-input"
					placeholder="Email"
					type="email"
					bind:value="{formEmail}"
				/>
				<input
					class="text-input"
					placeholder="Phone Number"
					type="tel"
					bind:value="{formPhone}"
				/>
				<textarea
					class="text-input"
					placeholder="Message"
					rows="5"
					cols="33"
					bind:value="{formMessage}"></textarea>
				<button class="text-white button popup bg-primary-600 w-full" type="submit"
					>Contact {agent?.name}</button
				>
			</form>
		</div>
	</div>
</div>

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: 53fr 0fr 100fr 0fr 100fr 0fr 100fr 0fr 50fr 0fr 100fr 0fr 100fr;
		/* column-gap: 1em; */
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		width: 644%;
		/* max-width: 1200px; */
	}
	.custom-grid > * {
		/* background: #eee; */
		/* border: 1px solid #ccc; */
		padding: 0 1em;
	}

	@media (max-width: theme(screens.xl)) {
		.custom-grid {
			grid-template-columns: 0fr 0fr 100fr 0fr 100fr 0fr 100fr 0fr 0fr 0fr 100fr 0fr 100fr;
			/* transform: translateX(-45.1%); */
			width: 450%;
		}
	}
</style>

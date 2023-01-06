<script lang="ts">
	import numbro from 'numbro';
	import { onMount, getContext } from 'svelte';
	import type { PageData } from './$types';
	import type { Listing } from '$lib/types/Listing';
	import type { Agent } from '$lib/types/Agent';

	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

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

	function moveLastToFront(arr) {
		mainImgIndex -= 1;
		direction = 'forwards';

		const lastItem = arr.pop();
		arr.unshift(lastItem);
		slides = arr;

		// movingImages = true;
		slides[0].url = getImg(mainImgIndex);
	}

	function moveFrontToEnd(arr) {
		mainImgIndex += 1;
		direction = 'backwards';

		const firstItem = arr.shift();
		arr.push(firstItem);
		slides = arr;

		// movingImages = true;
		slides[4].url = getImg(mainImgIndex + 4);
	}

	$: console.log(slides);

	let direction = 'forwards';
	let leftInfoBar: number;
	let widthInfoBar: number;
	let topForm: number;
	let formGap: HTMLDivElement;
	let infoNav: HTMLDivElement;

	onMount(() => {
		topForm = infoNav.getBoundingClientRect().bottom;
		leftInfoBar = formGap.getBoundingClientRect().left;
		widthInfoBar = formGap.getBoundingClientRect().width;
		console.log(formGap.getBoundingClientRect());

		window.addEventListener('resize', () => {
			leftInfoBar = formGap.getBoundingClientRect().left;
			widthInfoBar = formGap.getBoundingClientRect().width;
			console.log(formGap.getBoundingClientRect());
		});
	});
</script>

<!-- Info Bar -->
<div class="sticky top-0 z-40 {contentCovered ? 'bg-neutral-200' : ''}" bind:this="{infoNav}">
	<div class="h-20 max-w-screen-xl mx-auto">
		<div class="flex justify-center w-[100%] px-7 xl:px-0 h-full">
			<div
				class="px-3 w-full xl:w-8/12 shrink-0 flex justify-between gap-x-8 align-middle whitespace-nowrap flex-wrap"
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
			<div class="hidden xl:block w-4/12 shrink-0 px-3"> </div>
		</div>
	</div>
</div>

<div class="flex max-w-[1200px] mx-auto relative">
	<!-- Left Side -->
	<div id="main-content-container" class="flex flex-col max-w-[800px] divide-y">
		<!-- Image Carousel -->
		<div class="custom-grid">
			<div style="grid-column: 4;">
				<button
					class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 p-2 bg-primary-600 disabled:bg-primary-800 rounded-full drop-shadow-xl shine z-20"
					disabled="{movingImages}"
					on:click="{() => moveLastToFront(slides)}">L</button
				>
			</div>
			<div style="grid-column: 6;">
				<button
					class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 p-2 bg-primary-600 disabled:bg-primary-800 rounded-full drop-shadow-xl shine z-20"
					disabled="{movingImages}"
					on:click="{() => moveFrontToEnd(slides)}">R</button
				>
			</div>
			<div bind:this="{formGap}" style="grid-column: 7;"></div>

			{#each slides as slide, index (slide.id)}
				{@const usedCols = [1, 3, 5, 9, 11]}
				{@const col = usedCols[index]}
				{@const dur = index === 4 ? 0 : 2000}
				<div
					animate:flip="{{
						delay: 0,
						duration: (d) =>
							(index === 4 && direction === 'backwards') ||
							(index === 0 && direction === 'forwards')
								? 0
								: 2000,
						easing: quintOut,
					}}"
					style="grid-column: {col};"
					class="relative"
				>
					<img src="{slide.url}" alt="" />
				</div>
			{/each}
		</div>

		<!-- Main Content -->
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
												><h5 class="font-bold">{feature.featureCategory}</h5
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
	</div>

	<!-- Right Side -->
	<div class="ml-16 relative">
		<!-- Contact Form -->
		<div
			class="bg-neutral-200 sticky  {contentCovered
				? 'top-[100px]'
				: 'top-[80px]'}  text-black p-10 rounded-[4%] drop-shadow-lg shine-lg mb-10"
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
				<input class="text-input" placeholder="Full Name" type="text" />
				<input class="text-input" placeholder="Email" type="email" />
				<input class="text-input" placeholder="Phone Number" type="tel" />
				<textarea class="text-input" placeholder="Message" rows="5" cols="33"></textarea>
				<button
					class="text-white button popup bg-primary-600 w-full md:self-center"
					type="submit">Contact {agent?.name}</button
				>
			</form>
		</div>
	</div>
</div>

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: 2fr 0fr 2fr 0fr 2fr 0fr 1fr 0fr 2fr 0fr 2fr;
		column-gap: 2em;
		position: relative;
		left: 50%;
		transform: translateX(-45%);
		width: 600%;
		/* max-width: 1200px; */
	}
</style>

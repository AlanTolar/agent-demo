<script lang="ts">
	import { fly } from 'svelte/transition';
	import * as eases from 'svelte/easing';
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

	// create interface for image objects
	interface SlideImage {
		slidingURL: string;
		travelDistance: number;
	}

	let imgElem1: HTMLImageElement,
		imgElem2: HTMLImageElement,
		imgElem3: HTMLImageElement,
		imgElem4: HTMLImageElement,
		imgElem5: HTMLImageElement;

	let img1: SlideImage = { slidingURL: '', travelDistance: 0 };
	let img2: SlideImage = { slidingURL: '', travelDistance: 0 };
	let img3: SlideImage = { slidingURL: '', travelDistance: 0 };
	let img4: SlideImage = { slidingURL: '', travelDistance: 0 };
	let img5: SlideImage = { slidingURL: '', travelDistance: 0 };

	let movingImages = false;
	let movingForward = true;
	let mainImgIndex = 0;

	let imgCover = true;
	let slideSpeed = 500;
	let slideTransition = eases.cubicOut;

	function getImg(i: number): string {
		const imgURL =
			listing?.slideshowImages?.at(i % listing.slideshowImages.length) || '/placeholder.webp';
		return imgURL;
	}

	function startSlide(direction: string) {
		if (direction === 'forwards') {
			mainImgIndex += 1;
			movingForward = true;

			img1.slidingURL = imgElem2.src;
			img1.travelDistance =
				imgElem2.getBoundingClientRect().x - imgElem1.getBoundingClientRect().x;

			img2.slidingURL = imgElem3.src;
			img2.travelDistance =
				imgElem3.getBoundingClientRect().x - imgElem2.getBoundingClientRect().x;

			img3.slidingURL = imgElem4.src;
			img3.travelDistance =
				imgElem4.getBoundingClientRect().x - imgElem3.getBoundingClientRect().x;

			img4.slidingURL = imgElem5.src;
			img4.travelDistance =
				imgElem5.getBoundingClientRect().x - imgElem4.getBoundingClientRect().x;

			img5.slidingURL = getImg(mainImgIndex + 2);
			img5.travelDistance = imgElem5.width;
		}
		if (direction === 'backwards') {
			mainImgIndex -= 1;
			movingForward = false;

			img1.slidingURL = getImg(mainImgIndex - 2);
			img1.travelDistance = -imgElem1.width;

			img2.slidingURL = imgElem1.src;
			img2.travelDistance =
				imgElem1.getBoundingClientRect().x - imgElem2.getBoundingClientRect().x;

			img3.slidingURL = imgElem2.src;
			img3.travelDistance =
				imgElem2.getBoundingClientRect().x - imgElem3.getBoundingClientRect().x;

			img4.slidingURL = imgElem3.src;
			img4.travelDistance =
				imgElem3.getBoundingClientRect().x - imgElem4.getBoundingClientRect().x;

			img5.slidingURL = imgElem4.src;
			img5.travelDistance =
				imgElem4.getBoundingClientRect().x - imgElem5.getBoundingClientRect().x;
		}

		movingImages = true;
		if (!movingForward) imgElem1.src = img1.slidingURL;
		imgElem2.src = img2.slidingURL;
		imgElem3.src = img3.slidingURL;
		imgElem4.src = img4.slidingURL;
		if (movingForward) imgElem5.src = img5.slidingURL;
	}

	function endSlide() {
		if (movingForward) imgElem1.src = img1.slidingURL;
		if (!movingForward) imgElem5.src = img5.slidingURL;
		movingImages = false;
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
<div class="absolute z-20" style="top: {topForm}px; left:{leftInfoBar}px; width:{widthInfoBar}px;">
	<div class="w-full h-10 bg-black {contentCovered ? 'mt-2' : ''}"> </div>
</div>

<div class="overflow-clip relative">
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
</div>

<!-- <div class="flex justify-center gap-20 p-10">
	<button class="bg-neutral-300 p-3 button popup" on:click="{() => moveLastToFront(slides)}"
		>left</button
	>
	<button class="bg-neutral-300 p-3 button popup" on:click="{() => moveFrontToEnd(slides)}"
		>right</button
	>
</div> -->

<div class="overflow-clip">
	<div class="flex relative justify-center mt-1 max-w-screen-xl mx-auto">
		<!-- Slides -->
		<div class="relative w-full xl:w-8/12 shrink-0 carousel-item">
			<div class="aspect-w-5 aspect-h-3">
				<img
					bind:this="{imgElem1}"
					class="h-full {imgCover ? 'object-cover' : 'object-contain'}"
					src="{getImg(-2)}"
					alt=""
				/>
			</div>
			{#if movingImages && movingForward}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full carousel-item z-10"
					in:fly="{{
						x: img1.travelDistance,
						duration: slideSpeed,
						opacity: 1,
						easing: slideTransition,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-5 aspect-h-3">
						<img
							class="h-full {imgCover ? 'object-cover' : 'object-contain'}"
							src="{img1.slidingURL}"
							alt=""
						/>
					</div>
				</div>
			{/if}
		</div>
		<div class="relative w-full xl:w-8/12 shrink-0 carousel-item">
			<div class="aspect-w-5 aspect-h-3">
				<img
					bind:this="{imgElem2}"
					class="h-full {imgCover ? 'object-cover' : 'object-contain'} {movingImages
						? 'hidden'
						: ''}"
					src="{getImg(-1)}"
					alt=""
				/>
			</div>
			{#if movingImages}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full carousel-item z-10"
					in:fly="{{
						x: img2.travelDistance,
						duration: slideSpeed,
						opacity: 1,
						easing: slideTransition,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-5 aspect-h-3">
						<img
							class="h-full {imgCover ? 'object-cover' : 'object-contain'}"
							src="{img2.slidingURL}"
							alt=""
						/>
					</div>
				</div>
			{/if}
		</div>
		<div class="shrink-0 flex justify-center w-[100%] flex-col xl:flex-row">
			<div class="relative w-full xl:w-8/12 shrink-0 carousel-item">
				<div class="aspect-w-5 aspect-h-3">
					<!-- Slider controls -->
					<div class="h-full w-full">
						<button
							class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-12 h-12 p-2 bg-primary-600 disabled:bg-primary-800 rounded-full drop-shadow-xl shine z-20"
							disabled="{movingImages}"
							on:click="{() => startSlide('backwards')}"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 24 24"
								class="w-full text-neutral-100"
								stroke="currentColor"
								><path
									fill="currentColor"
									d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"
								></path></svg
							>
							<span class="sr-only">Previous</span>
						</button>
						<button
							class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-12 h-12 p-2 bg-primary-600 disabled:bg-primary-800 rounded-full drop-shadow-xl shine z-20"
							disabled="{movingImages}"
							on:click="{() => startSlide('forwards')}"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 24 24"
								class="w-full text-neutral-100"
								stroke="currentColor"
								><path
									fill="currentColor"
									d="M11.3 19.3q-.275-.275-.288-.7q-.012-.425.263-.7l4.9-4.9H5q-.425 0-.713-.288Q4 12.425 4 12t.287-.713Q4.575 11 5 11h11.175l-4.9-4.9q-.275-.275-.263-.7q.013-.425.288-.7q.275-.275.7-.275q.425 0 .7.275l6.6 6.6q.15.125.213.312q.062.188.062.388t-.062.375q-.063.175-.213.325l-6.6 6.6q-.275.275-.7.275q-.425 0-.7-.275Z"
								></path></svg
							>
							<span class="sr-only">Next</span>
						</button>
					</div>
					<img
						bind:this="{imgElem3}"
						class="h-full {imgCover ? 'object-cover' : 'object-contain'} {movingImages
							? 'hidden'
							: ''}"
						src="{getImg(0)}"
						alt=""
					/>
				</div>
				{#if movingImages}
					<div
						class="absolute font-bold top-0 left-0 w-full h-full carousel-item z-10"
						in:fly="{{
							x: img3.travelDistance,
							duration: slideSpeed,
							opacity: 1,
							easing: slideTransition,
						}}"
						on:introend="{() => endSlide()}"
					>
						<div class="aspect-w-5 aspect-h-3">
							<img
								class="h-full {imgCover ? 'object-cover' : 'object-contain'}"
								src="{img3.slidingURL}"
								alt=""
							/>
						</div>
					</div>
				{/if}

				<div
					id="main-content-container"
					class="flex flex-col py-10 max-w-[800px] mx-auto divide-y"
				>
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
										<iconify-icon
											icon="ph:tree-bold"
											class="py-1 pr-4"
											width="40"></iconify-icon>
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
										<iconify-icon
											icon="mingcute:road-line"
											class="py-1 pr-4"
											width="40"></iconify-icon>
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
														<p
															>{utilities.utility}: {utilities.availability}</p
														>
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
											><iconify-icon
												inline
												icon="ic:baseline-download"
												class="mr-2"></iconify-icon>Download Files</a
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
											>{listing.address.city || ''}, {listing.address.state ||
												''}
											{listing.address.postCode || ''}</p
										>
										<p>{listing.address.county || ''}</p>
									</div>
								</div>
							</div>
						</section>
					{/if}
				</div>
			</div>
			<div
				class="relative w-full xl:w-4/12 shrink-0 carousel-item max-w-[600px] xl:max-w-none mx-auto z-20"
			>
				<div
					class="bg-neutral-200 sticky {contentCovered
						? 'top-24'
						: ''} text-black p-10 rounded-[4%] drop-shadow-lg shine-lg mb-10"
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
						<!-- <TextInput /> -->
						<input class="text-input" placeholder="Full Name" type="text" />
						<input class="text-input" placeholder="Email" type="email" />
						<input class="text-input" placeholder="Phone Number" type="tel" />
						<textarea class="text-input" placeholder="Message" rows="5" cols="33"
						></textarea>
						<button
							class="text-white button popup bg-primary-600 w-full md:self-center"
							type="submit">Contact {agent?.name}</button
						>
					</form>
				</div>
			</div>
		</div>
		<div class="relative w-full xl:w-8/12 shrink-0 carousel-item">
			<div class="aspect-w-5 aspect-h-3">
				<img
					bind:this="{imgElem4}"
					class="h-full {imgCover ? 'object-cover' : 'object-contain'} {movingImages
						? 'hidden'
						: ''}"
					src="{getImg(1)}"
					alt=""
				/>
			</div>
			{#if movingImages}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full carousel-item z-10"
					in:fly="{{
						x: img4.travelDistance,
						duration: slideSpeed,
						opacity: 1,
						easing: slideTransition,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-5 aspect-h-3">
						<img
							class="h-full {imgCover ? 'object-cover' : 'object-contain'}"
							src="{img4.slidingURL}"
							alt=""
						/>
					</div>
				</div>
			{/if}
		</div>
		<div class="relative w-full xl:w-8/12 shrink-0 carousel-item">
			<div class="aspect-w-5 aspect-h-3">
				<img
					bind:this="{imgElem5}"
					class="h-full {imgCover ? 'object-cover' : 'object-contain'}"
					src="{getImg(2)}"
					alt=""
				/>
			</div>
			{#if movingImages && !movingForward}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full carousel-item z-10"
					in:fly="{{
						x: img5.travelDistance,
						duration: slideSpeed,
						opacity: 1,
						easing: slideTransition,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-5 aspect-h-3">
						<img
							class="h-full {imgCover ? 'object-cover' : 'object-contain'}"
							src="{img5.slidingURL}"
							alt=""
						/>
					</div>
				</div>
			{/if}
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
		transform: translateX(-50%);
		width: 90%;
		/* max-width: 1200px; */
	}
</style>

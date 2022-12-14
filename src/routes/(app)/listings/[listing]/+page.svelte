<script lang="ts">
	import { page } from '$app/stores';
	import { xlink_attr } from 'svelte/internal';
	import { fly } from 'svelte/transition';
	import * as eases from 'svelte/easing';

	const modules = import.meta.glob('$lib/content/listings/*.json', { eager: true });
	const listing = modules[`/src/lib/content/listings/${$page.params.listing}.json`];

	// let img1staticElem = '';
	// let img2staticElem = '';
	// let img3staticElem = '';
	// let img4staticElem = '';
	// let img5staticElem = '';

	// let img1slidingURL = '';
	// let img2slidingURL = '';
	// let img3slidingURL = '';
	// let img4slidingURL = '';
	// let img5slidingURL = '';

	// let img1travelDistance = 0;
	// let img2travelDistance = 0;
	// let img3travelDistance = 0;
	// let img4travelDistance = 0;
	// let img5travelDistance = 0;

	let img1 = { staticElem: null, slidingURL: '', travelDistance: 0 };
	let img2 = { staticElem: null, slidingURL: '', travelDistance: 0 };
	let img3 = { staticElem: null, slidingURL: '', travelDistance: 0 };
	let img4 = { staticElem: null, slidingURL: '', travelDistance: 0 };
	let img5 = { staticElem: null, slidingURL: '', travelDistance: 0 };

	let movingImages = false;
	let mainImgIndex = 0;

	function getImg(i: number) {
		const imgURL = listing.slideshow_images.at(i % listing.slideshow_images.length);
		return imgURL;
	}

	function startSlide(direction: string) {
		if (direction === 'forwards') {
			mainImgIndex += 1;

			img1.slidingURL = img2.staticElem.src;
			img1.travelDistance =
				img2.staticElem.getBoundingClientRect().x -
				img1.staticElem.getBoundingClientRect().x;

			img2.slidingURL = img3.staticElem.src;
			img2.travelDistance =
				img3.staticElem.getBoundingClientRect().x -
				img2.staticElem.getBoundingClientRect().x;

			img3.slidingURL = img4.staticElem.src;
			img3.travelDistance =
				img4.staticElem.getBoundingClientRect().x -
				img3.staticElem.getBoundingClientRect().x;

			img4.slidingURL = img5.staticElem.src;
			img4.travelDistance =
				img5.staticElem.getBoundingClientRect().x -
				img4.staticElem.getBoundingClientRect().x;

			img5.slidingURL = getImg(mainImgIndex + 2);
			img5.travelDistance = img5.staticElem.width;
		}
		if (direction === 'backwards') {
			mainImgIndex -= 1;

			img1.slidingURL = getImg(mainImgIndex - 2);
			img1.travelDistance = -img1.staticElem.width;

			img2.slidingURL = img1.staticElem.src;
			img2.travelDistance =
				img1.staticElem.getBoundingClientRect().x -
				img2.staticElem.getBoundingClientRect().x;

			img3.slidingURL = img2.staticElem.src;
			img3.travelDistance =
				img2.staticElem.getBoundingClientRect().x -
				img3.staticElem.getBoundingClientRect().x;

			img4.slidingURL = img3.staticElem.src;
			img4.travelDistance =
				img3.staticElem.getBoundingClientRect().x -
				img4.staticElem.getBoundingClientRect().x;

			img5.slidingURL = img4.staticElem.src;
			img5.travelDistance =
				img4.staticElem.getBoundingClientRect().x -
				img5.staticElem.getBoundingClientRect().x;
		}
		movingImages = true;
	}

	function endSlide() {
		img1.staticElem.src = img1.slidingURL;
		img2.staticElem.src = img2.slidingURL;
		img3.staticElem.src = img3.slidingURL;
		img4.staticElem.src = img4.slidingURL;
		img5.staticElem.src = img5.slidingURL;
		movingImages = false;
	}
</script>

<section>
	<div>movingImages: {movingImages}</div>

	<div id="main_carousel" class="flex relative gap-12 justify-center">
		<!-- Slides -->
		<div class="relative w-1/2 shrink-0">
			<div class="aspect-w-4 aspect-h-2">
				<img
					bind:this="{img1.staticElem}"
					class="h-full object-contain {movingImages ? 'hidden' : ''}"
					src="{getImg(-2)}"
					alt=""
				/>
			</div>
			{#if movingImages}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full"
					in:fly="{{
						x: img1.travelDistance,
						duration: 1000,
						opacity: 1,
						easing: eases.linear,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-4 aspect-h-2">
						<img class="h-full object-contain" src="{img1.slidingURL}" alt="" />
					</div>
				</div>
			{/if}
		</div>
		<div class="relative w-1/2 shrink-0">
			<div class="aspect-w-4 aspect-h-2">
				<img
					bind:this="{img2.staticElem}"
					class="h-full object-contain {movingImages ? 'hidden' : ''}"
					src="{getImg(-1)}"
					alt=""
				/>
			</div>
			{#if movingImages}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full"
					in:fly="{{
						x: img2.travelDistance,
						duration: 1000,
						opacity: 1,
						easing: eases.linear,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-4 aspect-h-2">
						<img class="h-full object-contain" src="{img2.slidingURL}" alt="" />
					</div>
				</div>
			{/if}
		</div>
		<div class="relative w-1/2 shrink-0">
			<div class="aspect-w-4 aspect-h-2">
				<img
					bind:this="{img3.staticElem}"
					class="h-full object-contain {movingImages ? 'hidden' : ''}"
					src="{getImg(0)}"
					alt=""
				/>
			</div>
			{#if movingImages}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full"
					in:fly="{{
						x: img3.travelDistance,
						duration: 1000,
						opacity: 1,
						easing: eases.linear,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-4 aspect-h-2">
						<img class="h-full object-contain" src="{img3.slidingURL}" alt="" />
					</div>
				</div>
			{/if}
		</div>
		<div class="relative w-1/2 shrink-0">
			<div class="aspect-w-4 aspect-h-2">
				<img
					bind:this="{img4.staticElem}"
					class="h-full object-contain {movingImages ? 'hidden' : ''}"
					src="{getImg(1)}"
					alt=""
				/>
			</div>
			{#if movingImages}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full"
					in:fly="{{
						x: img4.travelDistance,
						duration: 1000,
						opacity: 1,
						easing: eases.linear,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-4 aspect-h-2">
						<img class="h-full object-contain" src="{img4.slidingURL}" alt="" />
					</div>
				</div>
			{/if}
		</div>
		<div class="relative w-1/2 shrink-0">
			<div class="aspect-w-4 aspect-h-2">
				<img
					bind:this="{img5.staticElem}"
					class="h-full object-contain {movingImages ? 'hidden' : ''}"
					src="{getImg(2)}"
					alt=""
				/>
			</div>
			{#if movingImages}
				<div
					class="absolute font-bold top-0 left-0 w-full h-full"
					in:fly="{{
						x: img5.travelDistance,
						duration: 1000,
						opacity: 1,
						easing: eases.linear,
					}}"
					on:introend="{() => endSlide()}"
				>
					<div class="aspect-w-4 aspect-h-2">
						<img class="h-full object-contain" src="{img5.slidingURL}" alt="" />
					</div>
				</div>
			{/if}
		</div>

		<!-- Slider controls -->
		<button
			class="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 p-2 bg-primary-600 rounded-full button-elevated"
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
			class="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 p-2 bg-primary-600 rounded-full button-elevated"
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
</section>

<div id="default-carousel" class="relative" data-carousel="static">
	<!-- Carousel wrapper -->
	<div class="relative h-56 overflow-hidden rounded-lg md:h-96">
		<!-- Item 1 -->
		<div class="hidden duration-700 ease-in-out" data-carousel-item>
			<span
				class="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800"
				>First Slide</span
			>
			<img
				src="/uploads/farmer-pointing.jpeg"
				class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
				alt="..."
			/>
		</div>
		<!-- Item 2 -->
		<div class="hidden duration-700 ease-in-out" data-carousel-item>
			<img
				src="/uploads/people-talking.jpeg"
				class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
				alt="..."
			/>
		</div>
		<!-- Item 3 -->
		<div class="hidden duration-700 ease-in-out" data-carousel-item>
			<img
				src="/uploads/map.png"
				class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
				alt="..."
			/>
		</div>
	</div>
	<!-- Slider indicators -->
	<div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
		<button
			type="button"
			class="w-3 h-3 rounded-full"
			aria-current="false"
			aria-label="Slide 1"
			data-carousel-slide-to="0"></button>
		<button
			type="button"
			class="w-3 h-3 rounded-full"
			aria-current="false"
			aria-label="Slide 2"
			data-carousel-slide-to="1"></button>
		<button
			type="button"
			class="w-3 h-3 rounded-full"
			aria-current="false"
			aria-label="Slide 3"
			data-carousel-slide-to="2"></button>
	</div>
	<!-- Slider controls -->
	<button
		type="button"
		class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
		data-carousel-prev
	>
		<span
			class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"></path></svg
			>
			<span class="sr-only">Previous</span>
		</span>
	</button>
	<button
		type="button"
		class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
		data-carousel-next
	>
		<span
			class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5l7 7-7 7"></path></svg
			>
			<span class="sr-only">Next</span>
		</span>
	</button>
</div>

<div id="indicators-carousel" class="relative" data-carousel="static">
	<!-- Carousel wrapper -->
	<div class="relative h-56 overflow-hidden rounded-lg md:h-96">
		<!-- Item 1 -->
		<div class="hidden duration-700 ease-in-out" data-carousel-item="active">
			<img
				src="/uploads/map.png"
				class="absolute block w-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
				alt="..."
			/>
		</div>
		<!-- Item 2 -->
		<div class="hidden duration-700 ease-in-out" data-carousel-item>
			<img
				src="/uploads/picture.png"
				class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
				alt="..."
			/>
		</div>
		<!-- Item 4 -->
		<div class="hidden duration-700 ease-in-out" data-carousel-item>
			<img
				src="/uploads/hero-backdrop.jpeg"
				class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
				alt="..."
			/>
		</div>
		<!-- Item 5 -->
		<div class="hidden duration-700 ease-in-out" data-carousel-item>
			<img
				src="/uploads/farmer-pointing.jpeg"
				class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
				alt="..."
			/>
		</div>
	</div>
	<!-- Slider indicators -->
	<div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
		<button
			type="button"
			class="w-3 h-3 rounded-full"
			aria-current="true"
			aria-label="Slide 1"
			data-carousel-slide-to="0"></button>
		<button
			type="button"
			class="w-3 h-3 rounded-full"
			aria-current="false"
			aria-label="Slide 2"
			data-carousel-slide-to="1"></button>
		<button
			type="button"
			class="w-3 h-3 rounded-full"
			aria-current="false"
			aria-label="Slide 3"
			data-carousel-slide-to="2"></button>
		<button
			type="button"
			class="w-3 h-3 rounded-full"
			aria-current="false"
			aria-label="Slide 4"
			data-carousel-slide-to="3"></button>
		<button
			type="button"
			class="w-3 h-3 rounded-full"
			aria-current="false"
			aria-label="Slide 5"
			data-carousel-slide-to="4"></button>
	</div>
	<!-- Slider controls -->
	<button
		type="button"
		class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
		data-carousel-prev
	>
		<span
			class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"></path></svg
			>
			<span class="sr-only">Previous</span>
		</span>
	</button>
	<button
		type="button"
		class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
		data-carousel-next
	>
		<span
			class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5l7 7-7 7"></path></svg
			>
			<span class="sr-only">Next</span>
		</span>
	</button>
</div>

<section>
	<h3>Description</h3>
	<p class="prose main-paragraph">
		{@html listing.description}
	</p>
</section>

<section>
	<h3>Details</h3>
	<p class="prose main-paragraph">
		{@html listing.details}
	</p>
</section>

<section>
	<h3 class="heading-text">Summary</h3>
	<div>
		<div>
			<div>
				{#if 'feature_categories' in listing.summary}
					<h4 class="subtitle-text">Property</h4>
					{#each listing.summary.feature_categories as feature}
						<h5 class="font-bold">{feature.feature_category}</h5>
						<div>{feature.features}</div>
					{/each}
				{/if}
			</div>
			<div>
				{#if 'land_details' in listing.summary}
					<h4 class="subtitle-text">Land Details</h4>
					{#each listing.summary.land_details as land_detail}
						<div>{land_detail}</div>
					{/each}
				{/if}
			</div>
			<div>
				{#if 'distances' in listing.summary}
					<h4 class="subtitle-text">Distances</h4>
					{#each listing.summary.distances as distances}
						<p>{distances.distance} from {distances.location}</p>
					{/each}
				{/if}
			</div>
		</div>
		<div>
			<div>
				{#if 'utilities' in listing.summary}
					<h4 class="subtitle-text">Utilities</h4>
					{#each listing.summary.utilities as utilities}
						<p>{utilities.utility}: {utilities.availability}</p>
					{/each}
				{/if}
			</div>
			<div>
				{#if 'housing' in listing.summary}
					<h4 class="subtitle-text">Housing</h4>
					{#each listing.summary.housing as housing}
						<div>{housing}</div>
					{/each}
				{/if}
			</div>
			<div>
				{#if 'improvements' in listing.summary}
					<h4 class="subtitle-text">Improvements</h4>
					{#each listing.summary.improvements as improvements}
						<div>{improvements}</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</section>

<section>
	{#if listing.brouchure}
		<a
			href="{listing.brouchure}"
			class="text-white button button-elevated bg-primary-600 w-fit md:self-center"
			>Download Files</a
		>
	{/if}
	{#if listing.location}
		<a
			href="{listing.location}"
			class="text-white button button-elevated bg-primary-600 w-fit md:self-center"
			>Get Directions</a
		>
	{/if}
</section>

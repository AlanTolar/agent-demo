<script lang="ts">
	import { linear } from 'svelte/easing';

	let currentIndex = 0;
	let slides = [
		{ id: 1, src: '/farmer-pointing.jpeg', caption: 'Image 1' },
		{ id: 2, src: '/hero-backdrop.jpeg', caption: 'Image 2' },
		{ id: 3, src: '/people-talking.jpeg', caption: 'Image 3' },
	];

	let slideDirection = 'left';

	function nextSlide() {
		slideDirection = 'left';
		currentIndex = (currentIndex + 1) % slides.length;
	}
	function prevSlide() {
		slideDirection = 'right';
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	}

	function carousel(node, params) {
		let direction = slideDirection === 'left' ? 1 : -1;
		if (params.direction === 'in') direction *= -1;
		return {
			duration: 800,
			easing: params.easing || linear,
			css: (t, u) => {
				return `transform: translateX(${direction * u * 100}%)`;
			},
		};
	}
</script>

<div class="relative">
	<!-- Carousel wrapper -->
	<div class="relative h-56 overflow-hidden rounded-lg md:h-96">
		{#each slides as slide}
			{#if slide.id === slides[currentIndex].id}
				<div
					class="absolute h-full w-full"
					in:carousel="{{ direction: 'in' }}"
					out:carousel="{{ direction: 'out' }}"
				>
					<img
						src="{slide.src}"
						class="h-full w-full object-cover object-center"
						alt="..."
					/>
				</div>
			{/if}
		{/each}
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
		on:click="{() => prevSlide()}"
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
		on:click="{() => nextSlide()}"
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

<style>
	.right {
		animation: right 1s linear forwards;
	}
	.left {
		animation: left 1s linear forwards;
	}

	@keyframes right {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(100%);
		}
	}

	@keyframes left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>

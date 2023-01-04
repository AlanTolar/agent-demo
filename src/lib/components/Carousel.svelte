<script lang="ts">
	import { linear } from 'svelte/easing';
	import Icon from '@iconify/svelte';

	export let btnLocation = 'center';

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
		let direction = slideDirection === 'left' ? -1 : 1;
		if (params.state === 'in') direction *= -1;
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
					in:carousel="{{ state: 'in' }}"
					out:carousel="{{ state: 'out' }}"
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

	{#if btnLocation === 'center'}
		<button
			class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
			on:click="{() => prevSlide()}"
		>
			<slot name="previousBtn">
				<span
					class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-300/50"
				>
					<Icon
						icon="material-symbols:arrow-back"
						class="w-5 h-5 text-black sm:w-6 sm:h-6"
					/>
					<span class="sr-only">Previous</span>
				</span>
			</slot>
		</button>
		<button
			class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
			on:click="{() => nextSlide()}"
		>
			<slot name="nextBtn">
				<span
					class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-300/50"
				>
					<Icon
						icon="material-symbols:arrow-forward"
						class="w-5 h-5 text-black sm:w-6 sm:h-6"
					/>
					<span class="sr-only">Next</span>
				</span>
			</slot>
		</button>
	{/if}

	{#if btnLocation === 'bottom'}
		<div class="flex flex-row justify-center gap-20 py-6">
			<button class="cursor-pointer focus:outline-none" on:click="{() => prevSlide()}">
				<slot name="previousBtn">
					<span
						class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 "
					>
						<Icon
							icon="material-symbols:arrow-back"
							class="w-5 h-5 text-black sm:w-6 sm:h-6"
						/>
						<span class="sr-only">Previous</span>
					</span>
				</slot>
			</button>
			<button class="cursor-pointer focus:outline-none" on:click="{() => nextSlide()}">
				<slot name="nextBtn">
					<span
						class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 "
					>
						<Icon
							icon="material-symbols:arrow-forward"
							class="w-5 h-5 text-black sm:w-6 sm:h-6"
						/>
						<span class="sr-only">Next</span>
					</span>
				</slot>
			</button>
		</div>
	{/if}
</div>

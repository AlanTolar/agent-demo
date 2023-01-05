<script lang="ts">
	import { linear } from 'svelte/easing';
	import Icon from '@iconify/svelte';

	export let btnLocation = 'center';

	export let slides;

	let currentIndex = 0;

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

<!-- Carousel wrapper -->
<div class="relative h-56 overflow-hidden md:h-36">
	{#each slides as slide, index}
		{#if index === currentIndex}
			<div
				class="absolute h-full w-full"
				in:carousel|local="{{ state: 'in' }}"
				out:carousel|local="{{ state: 'out' }}"
			>
				<slot name="slide-structure" prop="{slide}" />
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
				<Icon icon="material-symbols:arrow-back" class="w-5 h-5 text-black sm:w-6 sm:h-6" />
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
	<div class="flex flex-row justify-center gap-20 pt-6">
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

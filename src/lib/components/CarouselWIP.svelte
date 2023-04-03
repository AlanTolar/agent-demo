<script>
	import { fly } from 'svelte/transition';

	let currentIndex = 0;
	let isAnimating = false;
	const images = [
		'https://via.placeholder.com/500x500?text=Image+1',
		'https://via.placeholder.com/500x500?text=Image+2',
		'https://via.placeholder.com/500x500?text=Image+3',
		'https://via.placeholder.com/500x500?text=Image+4',
		'https://via.placeholder.com/500x500?text=Image+5',
	];

	function handleArrowClick(direction) {
		if (!isAnimating) {
			isAnimating = true;
			if (direction === 'left') {
				currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
			} else {
				currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
			}
			setTimeout(() => {
				isAnimating = false;
			}, 500);
		}
	}
</script>

<div class="carousel">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="carousel-arrow carousel-arrow-left" on:click="{() => handleArrowClick('left')}">
		<span>&lt;</span>
	</div>
	{#each images as image, i}
		{#if i === currentIndex || i === (currentIndex - 1 + images.length) % images.length || i === (currentIndex + 1) % images.length}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img
				class="carousel-image {i === currentIndex
					? ''
					: i < currentIndex
					? 'carousel-image-left'
					: 'carousel-image-right'}"
				src="{image}"
			/>
		{/if}
	{/each}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="carousel-arrow carousel-arrow-right" on:click="{() => handleArrowClick('right')}">
		<span>&gt;</span>
	</div>
	<form class="carousel-form">
		<label>
			Name:
			<input type="text" name="name" />
		</label>
		<label>
			Email:
			<input type="email" name="email" />
		</label>
		<button type="submit">Submit</button>
	</form>
</div>

<style>
	.carousel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		position: relative;
	}

	.carousel-image {
		flex: 0 0 calc(100% / 3);
		transition: transform 0.5s ease-in-out;
	}

	.carousel-image-left {
		transform: translateX(-33.33%);
	}

	.carousel-image-right {
		transform: translateX(33.33%);
	}

	.carousel-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
		background-color: white;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		z-index: 10;
	}

	.carousel-arrow-left {
		left: 20px;
	}

	.carousel-arrow-right {
		right: 20px;
	}

	.carousel-form {
		margin-top: 20px;
	}
</style>

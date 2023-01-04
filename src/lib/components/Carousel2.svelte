<script>
	let currentIndex = 0;
	let slides = [
		{ id: 1, src: '/farmer-pointing.jpeg', caption: 'Image 1' },
		{ id: 2, src: '/hero-backdrop.jpeg', caption: 'Image 2' },
		{ id: 3, src: '/people-talking.jpeg', caption: 'Image 3' },
	];

	function nextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
	}
	function prevSlide() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	}
</script>

<div class="carousel">
	{#each slides as slide}
		<div
			class="carousel-slide"
			style="visibility: {slide.id === slides[currentIndex].id
				? 'visible'
				: 'hidden'}; transform: {slide.id === slides[currentIndex].id
				? 'translateX(0)'
				: slide.id < slides[currentIndex].id
				? 'translateX(-100%)'
				: 'translateX(100%)'}"
		>
			<img src="{slide.src}" alt="{slide.caption}" />
			<div class="carousel-caption">{slide.caption}</div>
		</div>
	{/each}
</div>
<button on:click="{prevSlide}">&lt;</button>
<button on:click="{nextSlide}">&gt;</button>

<style>
	.carousel {
		position: relative;
		width: 500px;
		height: 300px;
	}
	.carousel-slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: transform 0.6s ease;
	}
	.carousel-slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.carousel-caption {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.5);
		color: white;
		padding: 10px;
	}
</style>

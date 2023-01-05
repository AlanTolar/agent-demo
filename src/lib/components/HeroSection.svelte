<script>
	export let title = 'Title goes here';
	export let subtitle = 'Subtitle goes here';
	export let coverImgUrl = '/hero-backdrop.jpeg';
</script>

<section
	id="hero-section"
	style="background-image: url('{coverImgUrl}');"
	class="bg-cover bg-center"
>
	<div class="custom-container">
		<div class="w-full max-w-[450px] bg-primary-800/60 py-16 sm:py-24 px-12 backdrop-blur"
			><h1 class="mb-6 text-white display-text">{title}</h1>
			<p class="text-white subtitle-text">{subtitle}</p>
		</div>
	</div>
</section>

<!-- <img src="{coverImgUrl}" alt="" /> -->

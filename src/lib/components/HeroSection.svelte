<script lang="ts">
	export let title: string = '';
	export let subtitle: string = '';
	export let coverImgUrl: string = '/hero-backdrop.jpeg';
</script>

<section
	id="hero-section"
	style="background-image: url('{coverImgUrl}');"
	class="bg-cover bg-center"
>
	<div class="custom-container min-h-[400px]">
		{#if title || subtitle}
			<div
				class="flex flex-col justify-center w-full max-w-[450px] bg-primary-800/60 py-16 sm:py-24 px-12 backdrop-blur min-h-[400px]"
				><h1 class="mb-6 text-white display-text">{title ?? ''}</h1>
				<p class="text-white subtitle-text">{subtitle ?? ''}</p>
			</div>
		{/if}
	</div>
</section>

<!-- <img src="{coverImgUrl}" alt="" /> -->

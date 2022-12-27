<script lang="ts">
	import numbro from 'numbro';

	export let listing;
	export let extraClasses;
	export let horizontal = false;
</script>

<a
	href="{listing.url}"
	class="{extraClasses} rounded-xl hover:scale-105 tranistion duration-300 ease-out bg-neutral-100 shrink-0
	{horizontal ? 'flex' : ''}"
>
	{#if horizontal}
		<div
			class="shrink w-1/2 object-cover rounded-l-xl bg-cover bg-center"
			style:background-image="url('{listing.featuredImage}')"></div>
	{:else}
		<div class="aspect-w-3 aspect-h-2">
			<img class="rounded-t-xl" src="{listing.featuredImage}" alt="" />
		</div>
	{/if}
	<div class="{horizontal ? 'w-1/2' : ''} p-5 flex flex-col justify-between">
		<div>
			<span class="accent-text">{listing.address.city}, {listing.address.state}</span>
			<h3 class="mb-2 subtitle-text text-primary-600">{listing.title}</h3>
		</div>
		<div class="flex items-center gap-1 main-text">
			<span>{numbro(listing.acres).format({ thousandSeparated: true })} acres</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="currentColor"></circle></svg
			>

			<span
				>{numbro(listing.price).formatCurrency({
					thousandSeparated: true,
				})}</span
			>
		</div>
	</div>
</a>

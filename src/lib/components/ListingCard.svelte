<script lang="ts">
	import numbro from 'numbro';
	export let listing;
	export let extraClasses;
	export let horizontal = true;
</script>

<a
	href="{listing.url}"
	class="{extraClasses} rounded-xl hover:scale-105 tranistion duration-300 ease-out bg-neutral-100"
>
	<div class="aspect-w-3 aspect-h-2">
		<img class="object-cover rounded-t-xl" src="{listing.featured_image}" alt="" />
	</div>
	<div class="p-5">
		<span class="accent-text">{listing.address.city}, {listing.address.state}</span>
		<h3 class="mb-2 subtitle-text text-primary-600">{listing.title}</h3>
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

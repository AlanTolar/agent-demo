<script lang="ts">
	import { getListings } from '$lib/scripts/listings';
	const listings = getListings(3);
</script>

<h1>Listings</h1>
<div class="grid grid-cols-1 divide-y">
	{#each listings as listing}
		<div class="p-5">
			<a href="{listing.url}" class="text-xl font-bold">{listing.title}</a>
			<p class="mt-1 text-sm">{listing.body}</p>
			<img src="{listing.thumbnail}" alt="" class="h-40" />
		</div>
	{/each}
</div>

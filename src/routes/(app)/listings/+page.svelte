<script lang="ts">
	import { getListings } from '$lib/scripts/listings';
	const listings = getListings(3);
</script>

<div class="grid grid-cols-12 h-full">
	<div class="col-span-7"></div>
	<div class="col-span-5 grid grid-cols-1 divide-y bg-slate-200 border-8 border-black">
		{#each listings as listing}
			<div class="p-5">
				<a href="{listing.url}" class="text-xl font-bold">{listing.title}</a>
				<p class="mt-1 text-sm">{listing.body}</p>
				<img src="{listing.thumbnail}" alt="" class="h-20" />
			</div>
		{/each}
	</div>
</div>

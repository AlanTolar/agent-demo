<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const listings = data.listings;
</script>

<div class="grid grid-cols-12 h-[calc(100vh-64px)]">
	<div class="col-span-7">
		<div class="h-10 bg-slate-900 w-20 mt-10 mx-auto"></div>
	</div>
	<div
		class="col-span-5 flex flex-col divide-y bg-slate-200 border-8 border-black overflow-scroll"
	>
		{#each listings as listing}
			<div class="p-5">
				<a href="{listing.url}" class="text-xl font-bold">{listing.title}</a>
				<p class="mt-1 text-sm">{listing.body}</p>
				<img src="{listing.thumbnail}" alt="" class="h-20" />
			</div>
		{/each}
	</div>
</div>

<script lang="ts">
	import ListingCard from '$lib/components/ListingCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const listings = data.listings;
</script>

<div class="grid grid-cols-12 h-[calc(100vh-64px)]">
	<div class="col-span-7">
		<div class="h-10 bg-slate-900 w-20 mt-10 mx-auto"></div>
	</div>

	<div class="col-span-5 overflow-scroll">
		<div
			class="grid grid-cols-1 grid-flow-row auto-rows-fr gap-6 p-6 bg-slate-200 border-8 border-black"
		>
			{#each listings as listing}
				<ListingCard listing="{listing}" extraClasses="" horizontal="true" />
			{/each}
		</div>
	</div>
</div>

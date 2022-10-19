<script lang="ts">
	const modules = import.meta.glob('$lib/content/listings/*.json', { eager: true });
	const listings = Object.keys(modules).map((key) => {
		const url = `/listings/${key.split('/').at(-1)?.split('.').at(0)}`;
		return { ...modules[key], json_url: key, url };
	});
</script>

<h1>Listings</h1>
<div class="grid grid-cols-1 divide-y">
	{#each listings as listing}
		<div class="p-5">
			<a href={listing.url} class="text-xl font-bold">{listing.title}</a>
			<p class="mt-1 text-sm">{listing.body}</p>
			<img src={listing.thumbnail} alt="" class="h-40" />
		</div>
	{/each}
</div>

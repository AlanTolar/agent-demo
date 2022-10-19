<script lang="ts">
	const modules = import.meta.glob('./*.json', { eager: true });
	const listings = Object.values(modules);
	console.log(listings);
</script>

<h1>Listings</h1>
{#each listings as listing}
	<li>
		<span>{listing.title} - {listing.body}</span>
	</li>
{/each}

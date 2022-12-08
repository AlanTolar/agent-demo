<script lang="ts">
	import { onMount } from 'svelte';

	let previewData = {};
	onMount(() => {
		setInterval(() => {
			let current = window;
			let n = 0;
			while (current.parent && n < 10) {
				current = current.parent;
				n += 1;
				if (current.previewDataCMS) {
					previewData = current.previewDataCMS;
				}
			}
			previewData = JSON.parse(JSON.stringify(previewData));
			// console.log(previewData);
		}, 100);
	});

	// Write logic to call page based on type
</script>

<!-- Listing components -->
<ul>
	{#each Object.entries(previewData) as [key, value], index}
		<h6>{index}&#41; {key}</h6>
		{#if key === 'body'}
			<div class="prose prose-li:m-0 prose-p:m-0">
				{@html value.replace(/\n(?=\n)/g, '<br/>')}
				<!-- {@html md.render(value.replace(/\n/g, '&nbsp;\n'))} -->
			</div>
			<!-- <SvelteMarkdown source={value} /> -->
		{:else}
			<p>{value}</p>
		{/if}
	{/each}
</ul>
<!-- {/if} -->

<!-- Team components -->
{#if previewData.type === 'team'}{/if}

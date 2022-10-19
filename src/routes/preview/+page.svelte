<script lang="ts">
	import { onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import SvelteMarkdown from 'svelte-markdown';
	import Markdown from '@magidoc/plugin-svelte-marked';

	const options = { breaks: true };
	let md = new MarkdownIt(options);

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
			console.log(previewData);
			if (Object.keys(previewData).includes('body')) {
				// console.log(previewData.body);
				console.log(md.render(previewData.body.replace(/\n/g, '&nbsp;\n')));
				// console.log(md.render(previewData.body.replace(/\n/gi, '&nbsp;')));
			}
		}, 500);
	});

	// Write logic to call page based on type
</script>

<h1>Success!!</h1>
<Markdown
	source={`
# Setup
Here are the steps to set up svelte-marked plugin
1. Install it
2. Enjoy
    - If you enjoyed, make sure to star the repo!
`}
/>

<!-- Listing components -->
<ul>
	{#each Object.entries(previewData) as [key, value], index}
		<h6>{index}&#41; {key}</h6>
		{#if key === 'body'}
			<!-- {@html md.render(value.replace(/\n/g, '&nbsp;\n'))} -->
			<div class="markdown-body">
				{@html md.render(value)}
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

<style>
	@import url(/css/github-markdown.css);
	/* @import url(/css/pilcrow.css);
	@import url(/css/hljs-github.min.css); */
</style>

<script lang="ts">
	import { dataset_dev } from 'svelte/internal';
	import type { PageData } from './$types';
	export let data: PageData;
	import Markdown from '@magidoc/plugin-svelte-marked';
	import SvelteMarkdown from 'svelte-markdown';

	const source = `
  # This is a header

This is a paragraph.

* This is a list
* With two items
  1. And a sublist
  2. That is ordered
    * With another
    * Sublist inside

| And this is | A table |
|-------------|---------|
| With two    | columns |`;

	const options = { langPrefix: 'markdown-body' };

	const modules = import.meta.glob('$lib/content/listings/*.json', { eager: true });
	const listing = modules[`/src/lib/content/listings/${data.title}.json`];
</script>

<div class="markdown-body mylist">
	<SvelteMarkdown {source} {options} />
</div>

<div class="markdown-body mylist">
	<Markdown
		source={`
# Setup
Here are the steps to set up svelte-marked plugin
1. Install it
2. Enjoy
    - If you enjoyed, make sure to star the repo!
`}
	/>
</div>

<h1>{data.title}</h1>
<div class="p-5">
	<a href={listing.url} class="text-xl font-bold">{listing.title}</a>
	<p class="mt-1 text-sm">{listing.body}</p>
	<img src={listing.thumbnail} alt="" class="h-40" />
</div>

<style>
	@import url(/css/github-markdown.css);
	/* @import url(/css/pilcrow.css);
	@import url(/css/hljs-github.min.css); */
</style>

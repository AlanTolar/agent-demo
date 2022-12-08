<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	import SvelteMarkdown from 'svelte-markdown';

	import { page } from '$app/stores';

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
| With two    | columns |
`;

	const options = { langPrefix: 'markdown-body' };

	const modules = import.meta.glob('$lib/content/listings/*.json', { eager: true });
	const listing = modules[`/src/lib/content/listings/${$page.params.listing}.json`];
</script>

<div class="prose">
	<SvelteMarkdown source="{source}" options="{options}" />
</div>

<div class="prose">
	<Markdown
		source="{`
# Setup
Here are the steps to set up svelte-marked plugin
1. Install it
2. Enjoy
    - If you enjoyed, make sure to star the repo!
`}"
	/>
</div>

<h1>{$page.params.listing}</h1>
<div class="p-5">
	<a href="{listing.url}" class="text-xl font-bold">{listing.title}</a>
	<p class="mt-1 text-sm">{listing.body}</p>
	<img src="{listing.thumbnail}" alt="" class="h-40" />
</div>

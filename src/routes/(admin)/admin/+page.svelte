<script lang="ts">
	// import CMS from '@staticcms/core';
	import { config } from './config';
	import { onMount } from 'svelte';

	onMount(async () => {
		// Initialize the CMS object
		console.log('window.CMSLoaded: ', window.CMSLoaded);
		if (!window.CMSLoaded) window.CMS.init({ config });
		window.CMSLoaded = true;
		// Now the registry is available via the CMS object.
		// CMS.registerPreviewTemplate('my-template', MyTemplate);
	});
</script>

<svelte:head>
	<script src="https://unpkg.com/@staticcms/app@^1.0.0/dist/static-cms-app.js"></script>
</svelte:head>

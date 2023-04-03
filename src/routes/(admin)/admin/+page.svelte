<script lang="ts">
	import CMS from '@staticcms/core';
	import { config } from './config';

	// Initialize the CMS object
	CMS.init({ config });
	// Now the registry is available via the CMS object.
	// CMS.registerPreviewTemplate('my-template', MyTemplate);
</script>

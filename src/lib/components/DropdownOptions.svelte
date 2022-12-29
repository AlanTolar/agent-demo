<script>
	import { clickOutside } from '$lib/utils/clickOutside';
	export let name = '';
	let showFilterDropdown = false;
	$: console.log('showFilterDropdown: ', showFilterDropdown);
</script>

<div class="relative" use:clickOutside on:click_outside="{() => (showFilterDropdown = false)}">
	<button
		class="text-label font-semibold text-primary-600 flex"
		on:click="{() => (showFilterDropdown = !showFilterDropdown)}"
		>{name}<iconify-icon inline icon="material-symbols:keyboard-arrow-down" width="24"
		></iconify-icon></button
	>
	{#if showFilterDropdown}
		<div>
			<slot />
		</div>
	{/if}
</div>

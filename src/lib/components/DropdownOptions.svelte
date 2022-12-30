<script>
	import { clickOutside } from '$lib/utils/clickOutside';
	export let name = '';
	export let escape = false;
	let showFilterDropdown = false;
</script>

{#if escape}
	<slot />
{:else}
	<div class="relative" use:clickOutside on:click_outside="{() => (showFilterDropdown = false)}">
		<button
			class="text-label font-semibold text-primary-600 flex"
			on:click="{() => (showFilterDropdown = !showFilterDropdown)}"
			>{name}<iconify-icon inline icon="material-symbols:keyboard-arrow-down" width="24"
			></iconify-icon></button
		>
		<div class="{showFilterDropdown ? 'block' : 'hidden'}">
			<slot />
		</div>
	</div>
{/if}

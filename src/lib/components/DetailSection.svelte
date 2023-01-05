<script lang="ts">
	import Icon from '@iconify/svelte';

	export let icon: string;
</script>

<section class="flex gap-8 py-6">
	<div
		class="bg-neutral-200 rounded-full h-[90px] w-[90px] outline outline-2 outline-neutral-300 outline-offset-[-4px]"
	>
		<Icon class="w-full h-full p-5" icon="{icon}" />
	</div>
	<div class="w-3/4 flex flex-col gap-3">
		<slot />
	</div>
</section>

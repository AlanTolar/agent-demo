<script lang="ts">
	import type { PageData } from './$types';
	import type { Agent } from '$lib/types/Agent';

	export let data: PageData;
	let agents: Agent[] = data.agents;
</script>

<div class="flex flex-col gap-8 p-20">
	<h1 class="text-4xl font-bold text-neutral-800">Agents</h1>
	{#each agents as agent}
		<a href="{agent.url}" class="underline">{agent.name}</a>
	{/each}
</div>

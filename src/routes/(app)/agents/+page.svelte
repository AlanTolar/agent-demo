<script lang="ts">
	import type { PageData } from './$types';
	import type { Agent } from '$lib/types/Agent';
	import HeroSection from '$lib/components/HeroSection.svelte';

	export let data: PageData;
	let agents: Agent[] = data.agents;

	function dup(items) {
		return items.reduce(function (res, current, index, array) {
			return res.concat([current, current]);
		}, []);
	}

	agents = dup(agents);
	agents = dup(agents);

	const managers = agents.filter((agent) => agent.position === 'manager');
	const brokers = agents.filter((agent) => agent.position === 'broker');
</script>

<HeroSection
	title="Find an Agent"
	subtitle="We know the ins and outs of the market"
	coverImgUrl="sunshine-field.jpeg"
/>

{#if brokers.length > 0}
	<section class="custom-container pt-20 pb-14">
		<div class="flex justify-center">
			<div class="grow m-auto px-6 max-md:hidden"><hr style="border: 2px solid #000;" /></div>
			<h1 class="text-4xl font-bold text-neutral-800">Brokers</h1>
			<div class="grow m-auto px-6 max-md:hidden"><hr style="border: 2px solid #000;" /></div>
		</div>

		<div class="pt-10 flex flex-wrap justify-center gap-x-20 gap-y-20">
			{#each brokers as agent}
				<a class="hover:scale-105 tranistion duration-300 ease-out" href="{agent.url}">
					<div class="h-[300px] w-[200px] border-neutral-800 border-[10px]">
						<img class="object-cover h-full w-full" src="{agent.image}" alt="" />
					</div>
					<div class="mt-4 heading-text-sm text-primary-600">{agent.name}</div>
					<div class="mt-1">{agent.location}</div>
				</a>
			{/each}
		</div>
	</section>
{/if}
{#if managers.length > 0}
	<section class="custom-container pt-14 pb-20">
		<div class="flex justify-center">
			<div class="grow m-auto px-6 max-md:hidden"><hr style="border: 2px solid #000;" /></div>
			<h1 class="text-4xl font-bold text-neutral-800">Regional Managers</h1>
			<div class="grow m-auto px-6 max-md:hidden"><hr style="border: 2px solid #000;" /></div>
		</div>

		<div class="pt-10 flex flex-wrap justify-center gap-x-20 gap-y-20">
			{#each managers as agent}
				<a class="hover:scale-105 tranistion duration-300 ease-out" href="{agent.url}">
					<div class="h-[300px] w-[200px] border-neutral-800 border-[10px]">
						<img class="object-cover h-full w-full" src="{agent.image}" alt="" />
					</div>
					<div class="mt-4 heading-text-sm text-primary-600">{agent.name}</div>
					<div class="mt-1">{agent.location}</div>
				</a>
			{/each}
		</div>
	</section>
{/if}

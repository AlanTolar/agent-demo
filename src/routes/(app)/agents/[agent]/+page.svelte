<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import type { Agent } from '$lib/types/Agent';

	export let data: PageData;
	let agent: Agent = data.agent;
	console.log('agent: ', agent);

	let imgCover = true;
</script>

<section
	id="hero-section"
	class="bg-[url('/hero-backdrop.jpeg')] bg-cover bg-center h-[40vh] max-h-[400px]"
>
</section>

<section
	id="banner-section"
	class="bg-neutral-200 h-[25vh] max-h-[250px] outline outline-2 outline-neutral-800 outline-offset-[-8px]"
>
	<div class="custom-container h-3/4 flex flex-row items-end gap-24">
		<!-- <div class="bg-black w-40 h-60 z-10"></div> -->
		<!-- <div class="aspect-w-3 aspect-h-2">
			<img class="" src="/uploads/picture.png" alt="" />
		</div> -->
		<div class="w-1/3 md:w-1/6">
			<div
				class="aspect-w-4 aspect-h-6 {imgCover
					? 'object-cover'
					: 'object-contain'} border-neutral-800 border-[10px]"
			>
				<img class="object-cover" src="/farmer-pointing.jpeg" alt="" />
			</div>
		</div>

		<div>
			<h1 class="text-4xl font-bold text-neutral-800">{agent.name}</h1>
			<p class="text-neutral-800">{agent.position ?? ''}</p>
		</div>
		<div>
			<div>{agent.location ?? ''}</div>
			<div>{agent.email ?? ''}</div>
			<div>{agent.phone ?? ''}</div>
		</div>
	</div>
</section>

<section>
	<div class="flex justify-center w-[100%] flex-col xl:flex-row gap-12 py-20 custom-container">
		<div class="relative w-full xl:w-8/12 flex flex-col divide-y">
			{#if agent.bio}
				<section id="description-section" class="py-10">
					<h3 class="heading-text-sm">Description</h3>
					<div class="mt-4 prose main-paragraph max-w-none">
						{@html agent.bio}
					</div>
				</section>
			{/if}
			{#if agent.reviews}
				<section id="details-section" class="py-10">
					<h3 class="heading-text-sm">Details</h3>
					<div class="mt-4 prose main-paragraph max-w-none">
						{@html agent.reviews[0]}
					</div>
				</section>
			{/if}
		</div>
		<div class="relative w-full xl:w-4/12 max-w-[600px] xl:max-w-none mx-auto h-[800px]">
			<div
				class="bg-neutral-200 text-black p-10 rounded-[4%] drop-shadow-lg shine-lg  flex flex-col divide-y-2 divide-neutral-800"
			>
				<div class="pb-5">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad aspernatur
					facilis unde molestiae accusantium quod.
				</div>
				<div class="flex flex-col gap-6 pt-5">
					<input class="rounded-lg" placeholder="Full Name" type="text" />
					<input class="rounded-lg" placeholder="Email" type="email" />
					<input class="rounded-lg" placeholder="Phone Number" type="tel" />
					<textarea class="rounded-lg" placeholder="Message" rows="5" cols="33"
					></textarea>
				</div>
			</div>
		</div>
	</div>
</section>

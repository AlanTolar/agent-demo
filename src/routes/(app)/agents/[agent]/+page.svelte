<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import type { Agent } from '$lib/types/Agent';
	import type { Listing } from '$lib/types/Listing';
	import ListingCard from '$lib/components/ListingCard.svelte';
	import Icon from '@iconify/svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;
	let agent: Agent = data.agent;
	let listings: Listing[] = data.listings;

	console.log('agent: ', agent);
	console.log('listing: ', listings);

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
		<div class="w-1/3 md:w-1/6">
			<div
				class="aspect-w-4 aspect-h-6 {imgCover
					? 'object-cover'
					: 'object-contain'} border-neutral-800 border-[10px]"
			>
				<img class="object-cover" src="{agent.image}" alt="" />
			</div>
		</div>

		<div>
			<h1 class="text-3xl font-bold text-neutral-800">{agent.name}</h1>
			<p class="mt-2 subtitle-text">{agent.position ?? ''}</p>
		</div>
		<div class="flex flex-col gap-3">
			{#if agent.location}
				<div>
					<Icon
						icon="material-symbols:location-on-rounded"
						inline="{true}"
						class="inline-block mr-2"
					/>{agent.location}
				</div>
			{/if}
			{#if agent.email}
				<div
					><Icon
						icon="mdi:email"
						inline="{true}"
						class="inline-block mr-2"
					/>{agent.email}</div
				>
			{/if}
			{#if agent.phone}
				<div
					><Icon
						icon="mdi:phone-dial"
						inline="{true}"
						class="inline-block mr-2"
					/>{agent.phone}</div
				>
			{/if}
		</div>
	</div>
</section>

<section>
	<div class="flex justify-center w-[100%] flex-col xl:flex-row gap-12 py-10 custom-container">
		<div class="relative w-full xl:w-8/12 flex flex-col divide-y">
			{#if agent.bio}
				<section id="bio-section" class="py-10">
					<h3 class="heading-text-sm">Bio</h3>
					<div class="mt-4 prose main-paragraph max-w-none">
						{@html agent.bio}
					</div>
				</section>
			{/if}
			{#if agent.reviews}
				<section id="reviews-section" class="py-10">
					<h3 class="heading-text-sm">Reviews</h3>
					<Carousel btnLocation="{'bottom'}" slides="{agent.reviews}" let:prop="{review}">
						<svelte:fragment slot="slide-structure">
							<div class="mt-6 prose main-paragraph max-w-none">
								{@html review.review}
							</div>
							<div class="mt-3">
								<span class="font-medium">{review.customer}</span> / {review.title}
							</div>
						</svelte:fragment>
					</Carousel>
				</section>
			{/if}
			{#if listings.length}
				<section id="listings-section" class="py-10">
					<h3 class="heading-text-sm">Listings</h3>
					<div class="pt-6 flex flex-col gap-6 max-w-[500px]">
						{#each listings as listing}
							<ListingCard
								listing="{listing}"
								extraClasses="min-h-[130px] md:max-xl:hidden"
								horizontal="{true}"
							/>
						{/each}
					</div>
				</section>
			{/if}
		</div>
		<div class="relative w-full xl:w-4/12 max-w-[600px] xl:max-w-none mx-auto py-10">
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

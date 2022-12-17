<script lang="ts">
	import { getListings } from '$lib/scripts/listings';
	import ListingCard from '$lib/components/ListingCard.svelte';

	const listings = getListings();

	const cardContent = [
		{
			icon: 'material-symbols:landscape',
			title: 'Buy Land',
			body: 'We have a wide selection of land available, so you are sure to find the perfect piece of property for your needs.',
			btnLabel: 'Browse Listings',
			btnLink: '/listings',
		},
		{
			icon: 'material-symbols:person',
			title: 'Find Experts',
			body: 'Our agents are familiar with the local market and can help you find the right property to meet your needs.',
			btnLabel: 'Find an Agent',
			btnLink: '/agents',
		},
		{
			icon: 'material-symbols:attach-money',
			title: 'Sell Land',
			body: 'Our real estate company has the experience and resources to help you get the most value for your land.',
			btnLabel: 'Sell With Us',
			btnLink: '/sell',
		},
	];

	const firstCardIndex = 0;
	function listingCardDisplay(index: number) {
		if (index === firstCardIndex) {
			return '';
		} else if (index === firstCardIndex + 1) {
			return '';
		} else if (index === firstCardIndex + 2) {
			return 'hidden md:block';
		} else if (index === firstCardIndex + 3) {
			return 'hidden xl:block';
		} else {
			return 'hidden';
		}
	}
</script>

<section id="hero-section" class="bg-[url('/uploads/hero-backdrop.jpeg')] bg-cover bg-center">
	<div class="custom-container">
		<div class="w-full max-w-[450px] bg-primary-800/60 py-16 sm:py-24 px-12 backdrop-blur"
			><h1 class="mb-6 text-white display-text">Acres & Acres Real Estate</h1>
			<p class="text-white subtitle-text">A blank canvas for you to make your mark.</p>
		</div>
	</div>
</section>
<section id="services-section">
	<div class="flex flex-col gap-16 py-20 md:flex-row md:gap-12 custom-container">
		{#each cardContent as content}
			<div class="max-w-[500px] mx-auto flex md:flex-col items-center">
				<div class="p-1 md:mb-5 mr-5 md:mr-0 rounded-full bg-neutral-100">
					<div
						class="flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 border-4 rounded-full border-neutral-200"
					>
						<iconify-icon class="sm:hidden" icon="{content.icon}" width="45"
						></iconify-icon>
						<iconify-icon class="hidden sm:block" icon="{content.icon}" width="70"
						></iconify-icon>
					</div>
				</div>
				<div class="flex flex-col justify-between grow">
					<div>
						<h3 class="mb-3 md:text-center heading-text">{content.title}</h3>
						<p class="mb-5 main-text md:text-center">{content.body}</p>
					</div>
					<a
						href="{content.btnLink}"
						class="text-white button drop-shadow-xl shine bg-primary-600 w-fit md:self-center"
						>{content.btnLabel}</a
					>
				</div>
			</div>
		{/each}
	</div>
</section>
<section id="recent-listings-section" class="bg-neutral-200">
	<div class="py-20 custom-container">
		<div class="flex justify-between mb-6">
			<h3 class="heading-text">Recent Listings</h3>
			<a href="/listings" class="font-semibold underline main-text text-primary-600"
				>Browse Listings</a
			>
		</div>
		<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
			{#each listings as listing, index}
				<ListingCard listing="{listing}" extraClasses="{listingCardDisplay(index)}" />
			{/each}
		</div>
	</div>
</section>
<section id="newsletter-section" class="bg-neutral-200">
	<div class="gap-12 pt-10 pb-20 md:grid custom-container md:grid-cols-2">
		<div class="col-span-1 mb-6 text-center md:mb-0 md:text-left">
			<h3 class="mb-4 heading-text"
				>Sign up for our <span class="text-primary-600">newsletter</span></h3
			>
			<p class="main-text"
				>Stay up to date with new listings by signing up for our weekly newsletter.</p
			>
		</div>
		<div class="col-span-1 max-w-[400px] mx-auto">
			<div class="flex mb-2">
				<input class="w-full rounded-l-lg" type="text" name="" id="" />
				<button class="label-text px-5 py-2.5 text-white rounded-r-lg bg-primary-600"
					>Subscribe</button
				>
			</div>
			<p class="caption-text"
				>We care about the protection of your data. Read our <span class="underline"
					><a href="/">Privacy Policy</a></span
				>.</p
			>
		</div>
	</div>
</section>
<section id="find-agent-section">
	<div class="grid md:grid-cols-3 pt-20 custom-container">
		<img class="md:col-span-2" src="/uploads/farmer-pointing.jpeg" alt="" />
		<div
			class="self-center p-2 w-[90%] sm:w-[80%] mx-auto -mt-[15%] md:w-fit md:-ml-32 bg-neutral-100"
		>
			<div class="p-8 lg:p-12 border-4 border-neutral-200">
				<h3 class="mb-4 heading-text">Find the perfect agent</h3>
				<p class="mb-6 main-text"
					>Don't go through the process of selling your land alone. Let our experienced
					real estate agents help you every step of the way.</p
				>
				<a class="font-semibold underline text-primary-600 label-text" href="/agents"
					>Find an Agent</a
				>
			</div>
		</div>
	</div>
</section>
<section id="sell-section" class="relative overflow-hidden">
	<div class="custom-container grid grid-cols-3 sm:grid-cols-4 pt-20 sm:pt-40 pb-20">
		<div class="col-span-2 sm:mb-0">
			<h3 class="mb-4 heading-text">Sell your land with us</h3>
			<p class="mb-6 main-text"
				>We are a trusted and experienced real estate firm that will work hard to sell your
				land for the best possible price. We have a wide network of potential buyers and a
				proven track record of success.</p
			>
			<a class="font-semibold underline text-primary-600 label-text" href="/sell"
				>Sell With Us</a
			>
		</div>
	</div>
	<img
		class="absolute mask bottom-[-25%] sm:top-[10%] ml-8 left-[50%] h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] object-cover"
		src="/uploads/people-talking.jpeg"
		alt=""
	/>
</section>

<style>
	.mask {
		-webkit-mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		-webkit-mask-image: url(data:image/png;base64,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);
	}
</style>

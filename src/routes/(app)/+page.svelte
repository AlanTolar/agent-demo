<script lang="ts">
	import { getListings } from '$lib/scripts/listings';
	import numbro from 'numbro';

	const listings = getListings();
	console.log(listings);

	const cardContent = [
		{
			image: '/uploads/map-long.png',
			title: 'Buy Land',
			body: 'We have a wide selection of land available, so you are sure to find the perfect piece of property for your needs.',
			btnLabel: 'Browse Listings',
			btnLink: '/listings',
		},
		{
			image: '/uploads/map-long.png',
			title: 'Find Experts',
			body: 'Our agents are familiar with the local market and can help you find the right property to meet your needs.',
			btnLabel: 'Find an Agent',
			btnLink: '/agents',
		},
		{
			image: '/uploads/map-long.png',
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
			return 'hidden lg:block';
		} else {
			return 'hidden';
		}
	}
</script>

<section class="bg-[url('/uploads/map.png')] bg-cover ">
	<div class="custom-container">
		<div class="w-[40%] bg-primary-400 py-24 px-12"
			><h1 class="display-text text-white mb-6">Acres & Acres Real Estate</h1>
			<p class="subtitle-text text-white">A blank canvas for you to make your mark.</p>
		</div>
	</div>
</section>
<section>
	<div class="custom-container py-20 flex gap-12">
		{#each cardContent as content}
			<div class="text-center">
				<div class="h-24 w-24 bg-neutral-100 rounded-full p-1 mx-auto mb-5">
					<div class="w-full h-full rounded-full border-4 border-neutral-200 flex">
						<i class="fa-solid fa-mountain fa-3x m-auto"></i>
					</div>
				</div>
				<h3 class="mb-3 heading-text">{content.title}</h3>
				<p class="mb-8 main-text">{content.body}</p>
				<a href="{content.btnLink}" class="button bg-primary-600 text-white"
					>{content.btnLabel}</a
				>
			</div>
		{/each}
	</div>
</section>
<section class="bg-neutral-200">
	<div class="custom-container py-20">
		<div class="flex justify-between mb-6">
			<h3 class="heading-text">Recent Listings</h3>
			<a href="/listings" class="main-text underline font-semibold text-primary-600"
				>Browse Listing</a
			>
		</div>
		<div class="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{#each listings as listing, index}
				<a
					href="{listing.url}"
					class="{listingCardDisplay(
						index,
					)} rounded-xl bg-neutral-100 hover:scale-105 tranistion duration-300 ease-out"
				>
					<div class="aspect-w-3 aspect-h-2">
						<img class="object-cover rounded-t-xl" src="{listing.thumbnail}" alt="" />
					</div>
					<div class="p-5">
						<span class="accent-text"
							>{listing.address.city}, {listing.address.state}</span
						>
						<h3 class="subtitle-text mb-2 text-primary-600">{listing.title}</h3>
						<div class="flex items-center gap-1 main-text">
							<span
								>{numbro(listing.acres).format({ thousandSeparated: true })} acres</span
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 32 32"
								><circle cx="16" cy="16" r="8" fill="currentColor"></circle></svg
							>

							<span
								>{numbro(listing.price).formatCurrency({
									thousandSeparated: true,
								})}</span
							>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
<section class="bg-neutral-200">
	<div class="custom-container pt-10 pb-20 flex">
		<div>
			<h3>Sign up for our <span>newsletter</span></h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, explicabo.</p>
		</div>
		<div>
			<div class="flex">
				<input type="text" name="" id="" />
				<button>Btn</button>
			</div>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
		</div>
	</div>
</section>
<section>
	<div class="custom-container py-20">
		<img src="" alt="" />
		<div>
			<h3>Find the perfect agent</h3>
			<p
				>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, cupiditate
				consequuntur?</p
			>
			<a href="">Find an Agent</a>
		</div>
	</div>
</section>
<section>
	<div class="custom-container py-20">
		<div>
			<h3>Sell your land with us</h3>
			<p
				>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, cupiditate
				consequuntur?</p
			>
			<a href="">Find an Agent</a>
		</div>
		<img src="" alt="" />
	</div>
</section>

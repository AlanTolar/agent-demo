<script lang="ts">
	import { page } from '$app/stores';

	let imgCover = true;
</script>

<section
	id="hero-section"
	class="bg-[url('/uploads/hero-backdrop.jpeg')] bg-cover bg-center h-[40vh] max-h-[400px]"
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
		<div class="w-[25vh]">
			<div
				class="aspect-w-4 aspect-h-6 {imgCover
					? 'object-cover'
					: 'object-contain'} border-neutral-800 border-[10px]"
			>
				<img class="object-cover" src="/uploads/farmer-pointing.jpeg" alt="" />
			</div>
		</div>

		<div>
			<h1 class="text-4xl font-bold text-neutral-800">Agent Name</h1>
			<p class="text-neutral-800">Agent Description</p>
		</div>
		<div>
			<div>locaiton</div>
			<div>email</div>
			<div> phone </div>
		</div>
	</div>
</section>

<section>
	<div class="shrink-0 flex justify-center w-[100%] flex-col xl:flex-row py-20 custom-container">
		<div class="relative w-full xl:w-7/12 shrink-0 carousel-item">
			<div id="main-content-container" class="flex flex-col max-w-[800px] mx-auto divide-y">
				<!-- {#if listing.description}
					<section id="description-section" class="py-10">
						<h3 class="heading-text-sm">Description</h3>
						<div class="mt-4 prose main-paragraph max-w-none">
							{@html listing.description}
						</div>
					</section>
				{/if}
				{#if listing.details}
					<section id="details-section" class="py-10">
						<h3 class="heading-text-sm">Details</h3>
						<div class="mt-4 prose main-paragraph max-w-none">
							{@html listing.details}
						</div>
					</section>
				{/if}
				{#if listing.summary}
					<section id="summary-section" class="py-10">
						<h3 class="heading-text-sm">Summary</h3>
						<div class="mt-4 grid sm:grid-cols-2 gap-6">
							<div class="flex flex-col gap-6">
								<div class="flex">
									<iconify-icon icon="ph:tree-bold" class="py-1 pr-4" width="40"
									></iconify-icon>
									<div>
										{#if listing.summary.featureCategories}
											<h4 class="subtitle-text">Property</h4>
											<div class="mt-2 flex flex-col gap-2">
												{#each listing.summary.featureCategories as feature}
													<div
														><h5 class="font-bold"
															>{feature.featureCategory}</h5
														>
														<p>{feature.features}</p>
													</div>
												{/each}
											</div>
										{/if}
									</div>
								</div>
								<div class="flex">
									<iconify-icon
										icon="majesticons:checkbox-list-detail-line"
										class="py-1 pr-4"
										width="40"></iconify-icon>
									<div>
										{#if listing.summary.landDetails}
											<h4 class="subtitle-text">Land Details</h4>
											<div class="mt-2">
												<p>{listing.summary.landDetails}</p>
											</div>
										{/if}
									</div>
								</div>
								<div class="flex">
									<iconify-icon
										icon="mingcute:road-line"
										class="py-1 pr-4"
										width="40"></iconify-icon>
									<div>
										{#if listing.summary.distances}
											<h4 class="subtitle-text">Distances</h4>
											<div class="mt-2">
												{#each listing.summary.distances as distances}
													<p
														>{distances.distance} from {distances.location}</p
													>
												{/each}
											</div>
										{/if}
									</div>
								</div>
							</div>
							<div class="flex flex-col gap-6">
								<div class="flex">
									<iconify-icon
										icon="eos-icons:pipeline-outlined"
										class="py-1 pr-4"
										width="40"></iconify-icon>
									<div>
										{#if listing.summary.utilities}
											<h4 class="subtitle-text">Utilities</h4>
											<div class="mt-2">
												{#each listing.summary.utilities as utilities}
													<p
														>{utilities.utility}: {utilities.availability}</p
													>
												{/each}
											</div>
										{/if}
									</div>
								</div>
								<div class="flex">
									<iconify-icon
										icon="material-symbols:house-outline"
										class="py-1 pr-4"
										width="40"></iconify-icon>
									<div>
										{#if listing.summary.housing}
											<h4 class="subtitle-text">Housing</h4>
											<div class="mt-2">
												<p>{listing.summary.housing}</p>
											</div>
										{/if}
									</div>
								</div>
								<div class="flex">
									<iconify-icon
										icon="material-symbols:trending-up"
										class="py-1 pr-4"
										width="40"></iconify-icon>
									<div>
										{#if listing.summary.improvements}
											<h4 class="subtitle-text">Improvements</h4>
											<div class="mt-2">
												<p>{listing.summary.improvements}</p>
											</div>
										{/if}
									</div>
								</div>
							</div>
						</div>
					</section>
				{/if}
				{#if listing.brouchure || listing.location || listing.address.street}
					<section id="further-info-section" class="py-10">
						<h3 class="heading-text-sm">Further Information</h3>
						<div class="mt-4 grid sm:grid-cols-2 gap-6">
							<div class="flex flex-col gap-4 items-center">
								{#if listing.brouchure}
									<a
										href="{listing.brouchure}"
										class="text-white button drop-shadow-xl shine bg-primary-600 min-w-[70%] text-center"
										><iconify-icon
											inline
											icon="ic:baseline-download"
											class="mr-2"></iconify-icon>Download Files</a
									>
								{/if}
								{#if listing.location}
									<a
										href="{listing.location}"
										class="text-white button drop-shadow-xl shine bg-primary-600 min-w-[70%] text-center"
										><iconify-icon inline icon="mdi:map-marker" class="mr-2"
										></iconify-icon>Get Directions</a
									>
								{/if}
							</div>
							<div class="flex justify-center">
								<div>
									<p>{listing.address.street || ''}</p>
									<p
										>{listing.address.city || ''}, {listing.address.state || ''}
										{listing.address.postCode || ''}</p
									>
									<p>{listing.address.county || ''}</p>
								</div>
							</div>
						</div>
					</section>
				{/if} -->
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi nulla deleniti obcaecati
				suscipit amet nesciunt molestias doloremque culpa placeat dolorem quaerat alias excepturi
				similique at, accusantium ipsum. Mollitia, labore nesciunt.
			</div>
		</div>
		<div
			class="relative w-full xl:w-5/12 shrink-0 carousel-item max-w-[600px] xl:max-w-none mx-auto h-[8000px]"
		>
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

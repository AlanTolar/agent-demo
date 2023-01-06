<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import DetailSection from '$lib/components/DetailSection.svelte';
</script>

<HeroSection
	title="Sell With Us"
	subtitle="We have a proven track record of success"
	coverImgUrl="/sunshine-trees.jpeg"
/>
<section>
	<div class="flex justify-center w-[100%] flex-col xl:flex-row gap-12 py-10 custom-container">
		<div class="w-full xl:w-7/12 ">
			<section id="bio-section" class="pt-10 pb-6">
				<h1 class="heading-text-sm">Sell your land with us</h1>
				<div class="mt-4 prose main-paragraph max-w-none"
					>We specialize in selling land and have a deep understanding of the market. Our
					team of experts are passionate about their work and are dedicated to getting our
					clients the best possible price for their land. We have a proven track record of
					success and our clients always come first.</div
				>
			</section>
			<DetailSection icon="mdi:timer-sand"
				><h2 class="subtitle-text">Invaluable Experience</h2>
				<p class="prose">
					Our firm has a long history of successful land sales. We have a team of
					experienced agents who know how to market and sell land.
				</p>
			</DetailSection>
			<DetailSection icon="mdi:account-group-outline"
				><h2 class="subtitle-text">Invaluable Experience</h2>
				<p class="prose">
					Our firm has a long history of successful land sales. We have a team of
					experienced agents who know how to market and sell land.
				</p>
			</DetailSection>
			<DetailSection icon="mdi:chart-timeline-variant-shimmer"
				><h2 class="subtitle-text">Invaluable Experience</h2>
				<p class="prose">
					Our firm has a long history of successful land sales. We have a team of
					experienced agents who know how to market and sell land.
				</p>
			</DetailSection>
		</div>
		<div class="relative w-full xl:w-5/12 max-w-[600px] xl:max-w-none mx-auto py-10">
			<div
				class="bg-neutral-200 text-black p-10 rounded-[4%] drop-shadow-lg shine-lg flex flex-col divide-y-2 divide-neutral-800"
			>
				<div class="pb-5">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad aspernatur
					facilis unde molestiae accusantium quod.
				</div>
				<div class="flex flex-col gap-6 pt-5">
					<input class="text-input" placeholder="Full Name" type="text" />
					<input class="text-input" placeholder="Email" type="email" />
					<input class="text-input" placeholder="Phone Number" type="tel" />
					<textarea class="text-input" placeholder="Message" rows="5" cols="33"
					></textarea>
				</div>
			</div>
		</div>
	</div>
</section>

<script lang="ts">
	import { page } from '$app/stores';

	const modules = import.meta.glob('$lib/content/listings/*.json', { eager: true });
	const listing = modules[`/src/lib/content/listings/${$page.params.listing}.json`];
	// const listing = source;
</script>

<div>
	<section>
		<h3>Description</h3>
		<p class="prose main-paragraph">
			{@html listing.description}
		</p>
	</section>

	<section>
		<h3>Details</h3>
		<p class="prose main-paragraph">
			{@html listing.details}
		</p>
	</section>

	<section>
		<h3>Summary</h3>
		<div>
			<div>
				<div>
					<h4>Property</h4>
					{#each ['type', 'road_frontage'] as attribute}
						{#if attribute in listing.summary.property}
							<h5 class="">{attribute}</h5>
							<div>{listing.summary.property[attribute]}</div>
						{/if}
					{/each}
				</div>
				<div> </div>
			</div>
			<div>
				<div> </div>
				<div> </div>
				<div> </div>
			</div>
		</div>
	</section>

	<div class="p-5">
		<h2>{listing.title}</h2>
		<img src="{listing.thumbnail}" alt="" class="h-40" />
	</div>
</div>

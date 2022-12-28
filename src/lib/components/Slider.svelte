<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';
	import numbro from 'numbro';

	export let min = 0;
	export let max = 100;
	export let step = max / 100;
	export let name = 'Range';
	export let symbol = '';

	let range = [min, max];
</script>

<div class="flex justify-between items-baseline">
	<label for="steps-range" class="label-texts">{name}</label>
	<span class="caption-text"
		>{symbol}{numbro(range[0]).format({ average: true, totalLength: 2 })} - {symbol}{numbro(
			range[1],
		).format({
			average: true,
			totalLength: 2,
		})}{range[1] === max ? '+' : ''}</span
	>
</div>
<RangeSlider min="{min}" max="{max}" step="{step}" range pushy bind:values="{range}" on:stop />

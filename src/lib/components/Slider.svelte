<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';
	import numbro from 'numbro';

	export let min = 0;
	export let max = 100;
	export let step = max / 100;
	export let name = 'Range';
	export let prefix = '';

	let range = [min, max];

	$: minNum = numbro(range[0]).format({ average: true, totalLength: 2 });
	$: maxNum = numbro(range[1]).format({ average: true, totalLength: 2 });
</script>

<div class="flex justify-between items-baseline">
	<label for="steps-range" class="label-texts">{name}</label>
	<span class="caption-text"
		>{prefix}{minNum} - {prefix}{maxNum}{range[1] === max ? '+' : ''}</span
	>
</div>
<RangeSlider min="{min}" max="{max}" step="{step}" range pushy bind:values="{range}" on:stop />

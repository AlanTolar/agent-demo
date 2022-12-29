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

	numbro.zeroFormat('0');
</script>

<div class="flex justify-between items-baseline px-2">
	<label for="steps-range" class="label-texts">{name}</label>
	<span class="caption-text"
		>{prefix}{minNum} - {prefix}{maxNum}{range[1] === max ? '+' : ''}</span
	>
</div>
<div class="slider">
	<RangeSlider min="{min}" max="{max}" step="{step}" range pushy bind:values="{range}" on:stop />
</div>

<style>
	.slider {
		--range-slider: #d7dada; /* slider main background color */
		--range-handle-inactive: theme(colors.neutral.400); /* inactive handle color */
		--range-handle: var(--range-handle-inactive); /* non-focussed handle color */
		--range-handle-focus: var(--range-handle-inactive); /* focussed handle color */
		--range-handle-border: var(--range-handle-inactive);
		--range-range-inactive: theme(colors.primary.400); /* inactive range bar background color */
		--range-range: var(--range-range-inactive); /* active range bar background color */
		--range-float-inactive: var(
			--range-handle-inactive
		); /* inactive floating label background color */
		--range-float: var(--range-handle-focus); /* floating label background color */
		--range-float-text: white; /* text color on floating label */
	}
</style>

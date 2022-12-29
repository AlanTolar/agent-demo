<script>
	export let name = '';
	export let title = '';
</script>

<div class="flex items-center mb-2">
	<input type="radio" value="" name="{name}" class="w-4 h-4" on:change />
	<label for="default-radio-1" class="ml-2 ">{title}</label>
</div>

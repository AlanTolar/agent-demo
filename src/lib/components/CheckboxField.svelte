<script>
	export let name = '';
	export let title = '';
	export let checked = false;
</script>

<div>
	<input type="checkbox" checked="{checked}" id="{name}" />
	<label class="ml-1" for="{name}">{title}</label>
</div>

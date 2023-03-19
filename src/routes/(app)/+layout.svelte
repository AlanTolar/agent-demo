<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/utils/clickOutside';

	const nav_items = [
		{
			label: 'Browse Listings',
			link: '/listings',
		},
		{
			label: 'Find an Agent',
			link: '/agents',
		},
		{
			label: 'Sell With Us',
			link: '/sell',
		},
	];

	let showMobileNav = false;
	let btmBarShow: Boolean;
	$: btmBarShow = $page.url.pathname !== '/listings';
</script>

<div class="flex flex-col" style="min-height:100%">
	<header
		class="bg-primary-600 text-neutral-50"
		use:clickOutside
		on:click_outside="{() => (showMobileNav = false)}"
	>
		<nav class="flex justify-between px-4 md:px-6 lg:px-12 h-16">
			<a href="/" class="flex items-center gap-2" on:click="{() => (showMobileNav = false)}">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 sm:h-7 lg:h-8 mr-1"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
					><path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m16 5l3 3l-2 1l4 4l-3 1l4 4h-9m2 3v-3m-7-5l-2-2m2 1l2-2M8 21V8m-2.176 7.995a3 3 0 0 1-2.743-3.69a2.998 2.998 0 0 1 .304-4.833A3 3 0 0 1 8 3.765a3 3 0 0 1 4.614 3.707a2.997 2.997 0 0 1 .305 4.833A3 3 0 0 1 10 16H6z"
					></path></svg
				>
				<span class="heading-text whitespace-nowrap">Acres & Acres</span>
			</a>
			<div class="flex items-center justify-end gap-10">
				{#each nav_items as item}
					<a
						href="{item.link}"
						class="label-text hidden md:block
								{$page.url.pathname === item.link
							? 'font-bold text-neutral-300'
							: 'hover:underline hover:underline-offset-8 hover:decoration-2 hover:decoration-neutral-400'}"
						>{item.label}</a
					>
				{/each}
				<button
					type="button"
					class="p-2 ml-3 md:hidden"
					aria-controls="navbar-default"
					aria-expanded="false"
					on:click="{() => (showMobileNav = !showMobileNav)}"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-6"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clip-rule="evenodd"></path></svg
					>
				</button>
			</div>
		</nav>
		<!-- Mobile menu, show/hide based on menu state. -->
		<div
			class="absolute right-0 left-0 bg-primary-700/70 backdrop-blur text-neutral-50 md:hidden flex flex-col gap-2 py-2 {showMobileNav
				? 'block'
				: 'hidden'} z-50"
		>
			{#each nav_items as item}
				<a
					href="{item.link}"
					class="self-end px-4 py-1 text-sm font-medium label-text
					{$page.url.pathname === item.link
						? 'font-bold text-neutral-300'
						: 'hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-neutral-400'}"
					on:click="{() => (showMobileNav = false)}">{item.label}</a
				>
			{/each}
		</div>
	</header>

	<div class="grow">
		<slot />
	</div>
</div>

<footer
	class="{btmBarShow
		? ''
		: 'hidden'} bg-primary-600 text-neutral-50 px-4 md:px-6 lg:px-12 grid divide-y divide-primary-400"
>
	<nav class="flex justify-between md:grid md:grid-cols-12 items-start md:items-center py-3">
		<a
			href="/"
			class="col-span-2 subtitle-text whitespace-nowrap"
			on:click="{() => (showMobileNav = false)}">Acres & Acres</a
		>
		<div class="col-span-8 flex justify-center items-end flex-col md:flex-row gap-2 md:gap-10">
			{#each nav_items as item}
				<a
					href="{item.link}"
					class="caption-text whitespace-nowrap {$page.url.pathname === item.link
						? ''
						: 'hover:text-neutral-300'}">{item.label}</a
				>
			{/each}
		</div>
	</nav>
	<div class="flex flex-col sm:flex-row gap-2 justify-between items-center py-3">
		<nav class="flex gap-2">
			<a href=""><iconify-icon inline icon="mdi:twitter" width="20"></iconify-icon></a>
			<a href=""><iconify-icon inline icon="mdi:facebook" width="20"></iconify-icon></a>
			<a href=""><iconify-icon inline icon="mdi:instagram" width="20"></iconify-icon></a>
		</nav>
		<span class="caption-text"
			>© {new Date().getFullYear()} Acres and Acres, Inc. All rights reserved.</span
		>
	</div>
</footer>
<!-- </main> -->

<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/scripts/clickOutside.js';

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

<div class="flex flex-col h-screen">
	<header
		class=" bg-primary-600 text-neutral-50"
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

	<main class="grow overflow-scroll flex flex-col">
		<div class="grow  shrink-0">
			<slot />
		</div>
		<footer
			class="{btmBarShow ? '' : 'hidden'} bg-slate-200 h-20 px-4 md:px-6 lg:px-12  shrink-0"
		>
			<nav class="grid grid-cols-12">
				<a
					href="/"
					class="col-span-2 subtitle-text whitespace-nowrap"
					on:click="{() => (showMobileNav = false)}">Acres & Acres</a
				>
				<div class="col-span-8 flex items-center justify-center gap-10">
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
				</div>
			</nav>
			<div class="flex justify-between">
				<nav class="flex gap-2">
					<a href="">1</a>
					<a href="">2</a>
					<a href="">3</a>
					<a href="">4</a>
				</nav>
				<span>text</span>
			</div>
		</footer>
	</main>
</div>

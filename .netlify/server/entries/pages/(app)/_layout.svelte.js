import { c as create_ssr_component, b as subscribe, s as setContext, d as each, e as escape, f as add_attribute } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/stores.js";
import { w as writable } from "../../../chunks/index3.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mainContentScroll, $$unsubscribe_mainContentScroll;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const nav_items = [
    {
      label: "Browse Listings",
      link: "/listings"
    },
    { label: "Find an Agent", link: "/agents" },
    { label: "Sell With Us", link: "/sell" }
  ];
  let btmBarShow;
  let mainContent;
  let mainContentScroll = writable(0);
  $$unsubscribe_mainContentScroll = subscribe(mainContentScroll, (value) => $mainContentScroll = value);
  setContext("scroll", $mainContentScroll);
  setContext("scroll", mainContentScroll);
  btmBarShow = $page.url.pathname !== "/listings";
  $$unsubscribe_mainContentScroll();
  $$unsubscribe_page();
  return `<div class="${"flex flex-col h-screen"}"><header class="${"bg-primary-600 text-neutral-50"}"><nav class="${"flex justify-between px-4 md:px-6 lg:px-12 h-16"}"><a href="${"/"}" class="${"flex items-center gap-2"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-6 sm:h-7 lg:h-8 mr-1"}" preserveAspectRatio="${"xMidYMid meet"}" viewBox="${"0 0 24 24"}"><path fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"m16 5l3 3l-2 1l4 4l-3 1l4 4h-9m2 3v-3m-7-5l-2-2m2 1l2-2M8 21V8m-2.176 7.995a3 3 0 0 1-2.743-3.69a2.998 2.998 0 0 1 .304-4.833A3 3 0 0 1 8 3.765a3 3 0 0 1 4.614 3.707a2.997 2.997 0 0 1 .305 4.833A3 3 0 0 1 10 16H6z"}"></path></svg>
				<span class="${"heading-text whitespace-nowrap"}">Acres &amp; Acres</span></a>
			<div class="${"flex items-center justify-end gap-10"}">${each(nav_items, (item) => {
    return `<a${add_attribute("href", item.link, 0)} class="${"label-text hidden md:block " + escape(
      $page.url.pathname === item.link ? "font-bold text-neutral-300" : "hover:underline hover:underline-offset-8 hover:decoration-2 hover:decoration-neutral-400",
      true
    )}">${escape(item.label)}</a>`;
  })}
				<button type="${"button"}" class="${"p-2 ml-3 md:hidden"}" aria-controls="${"navbar-default"}" aria-expanded="${"false"}"><span class="${"sr-only"}">Open main menu</span>
					<svg class="${"h-6"}" aria-hidden="${"true"}" fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path fill-rule="${"evenodd"}" d="${"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"}" clip-rule="${"evenodd"}"></path></svg></button></div></nav>
		
		<div class="${"absolute right-0 left-0 bg-primary-700/70 backdrop-blur text-neutral-50 md:hidden flex flex-col gap-2 py-2 " + escape("hidden", true) + " z-50"}">${each(nav_items, (item) => {
    return `<a${add_attribute("href", item.link, 0)} class="${"self-end px-4 py-1 text-sm font-medium label-text " + escape(
      $page.url.pathname === item.link ? "font-bold text-neutral-300" : "hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-neutral-400",
      true
    )}">${escape(item.label)}</a>`;
  })}</div></header>

	<main class="${"grow overflow-scroll flex flex-col"}"${add_attribute("this", mainContent, 0)}><div class="${"grow"}">${slots.default ? slots.default({}) : ``}</div>
		<footer class="${escape(btmBarShow ? "" : "hidden", true) + " bg-primary-600 text-neutral-50 px-4 md:px-6 lg:px-12 grid divide-y divide-primary-400"}"><nav class="${"flex justify-between md:grid md:grid-cols-12 items-start md:items-center py-3"}"><a href="${"/"}" class="${"col-span-2 subtitle-text whitespace-nowrap"}">Acres &amp; Acres</a>
				<div class="${"col-span-8 flex justify-center items-end flex-col md:flex-row gap-2 md:gap-10"}">${each(nav_items, (item) => {
    return `<a${add_attribute("href", item.link, 0)} class="${"caption-text whitespace-nowrap " + escape(
      $page.url.pathname === item.link ? "" : "hover:text-neutral-300",
      true
    )}">${escape(item.label)}</a>`;
  })}</div></nav>
			<div class="${"flex flex-col sm:flex-row gap-2 justify-between items-center py-3"}"><nav class="${"flex gap-2"}"><a href="${""}"><iconify-icon inline icon="${"mdi:twitter"}" width="${"20"}"></iconify-icon></a>
					<a href="${""}"><iconify-icon inline icon="${"mdi:facebook"}" width="${"20"}"></iconify-icon></a>
					<a href="${""}"><iconify-icon inline icon="${"mdi:instagram"}" width="${"20"}"></iconify-icon></a></nav>
				<span class="${"caption-text"}">© 2022 Acres and Acres, Inc. All rights reserved.</span></div></footer></main></div>`;
});
export {
  Layout as default
};

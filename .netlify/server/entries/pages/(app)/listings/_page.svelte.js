import { c as create_ssr_component, d as each, f as add_attribute, e as escape } from "../../../../chunks/index.js";
import { g as getListings } from "../../../../chunks/listings.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const listings = getListings(3);
  return `<h1>Listings</h1>
<div class="${"grid grid-cols-1 divide-y"}">${each(listings, (listing) => {
    return `<div class="${"p-5"}"><a${add_attribute("href", listing.url, 0)} class="${"text-xl font-bold"}">${escape(listing.title)}</a>
			<p class="${"mt-1 text-sm"}">${escape(listing.body)}</p>
			<img${add_attribute("src", listing.thumbnail, 0)} alt="${""}" class="${"h-40"}">
		</div>`;
  })}</div>`;
});
export {
  Page as default
};

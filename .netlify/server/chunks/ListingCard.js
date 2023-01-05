import { c as create_ssr_component, f as add_attribute, e as escape, h as add_styles } from "./index.js";
import numbro from "numbro";
const ListingCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { listing } = $$props;
  let { extraClasses } = $$props;
  let { horizontal = false } = $$props;
  if ($$props.listing === void 0 && $$bindings.listing && listing !== void 0)
    $$bindings.listing(listing);
  if ($$props.extraClasses === void 0 && $$bindings.extraClasses && extraClasses !== void 0)
    $$bindings.extraClasses(extraClasses);
  if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0)
    $$bindings.horizontal(horizontal);
  return `<a${add_attribute("href", listing.url, 0)} class="${escape(extraClasses, true) + " rounded-xl hover:scale-105 tranistion duration-300 ease-out bg-neutral-100 shrink-0 " + escape(horizontal ? "flex" : "", true)}">${horizontal ? `<div class="${"shrink w-5/12 object-cover rounded-l-xl bg-cover bg-center"}"${add_styles({
    "background-image": `url('${listing.featuredImage}')`
  })}></div>` : `<div class="${"aspect-w-3 aspect-h-2"}"><img class="${"rounded-t-xl"}"${add_attribute("src", listing.featuredImage, 0)} alt="${""}"></div>`}
	<div class="${"p-5 flex flex-col justify-between"}"><div><span class="${"accent-text"}">${escape(listing.address.city)}, ${escape(listing.address.state)}</span>
			<h3 class="${"mb-2 subtitle-text text-primary-600"}">${escape(listing.title)}</h3></div>
		<div class="${"flex items-center gap-1 main-text whitespace-nowrap flex-wrap"}"><span>${escape(numbro(listing.acres).format({ thousandSeparated: true }))} acres</span>
			<svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-3"}" preserveAspectRatio="${"xMidYMid meet"}" viewBox="${"0 0 32 32"}"><circle cx="${"16"}" cy="${"16"}" r="${"8"}" fill="${"currentColor"}"></circle></svg>

			<span>${escape(numbro(listing.price).formatCurrency({ thousandSeparated: true }))}</span></div></div></a>`;
});
export {
  ListingCard as L
};

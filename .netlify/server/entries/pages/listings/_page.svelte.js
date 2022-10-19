import { _ as __vite_glob_0_0, a as __vite_glob_0_1 } from "../../../chunks/f.js";
import { c as create_ssr_component, d as each, f as add_attribute, e as escape } from "../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const modules = /* @__PURE__ */ Object.assign({ "/src/lib/content/listings/df.json": __vite_glob_0_0, "/src/lib/content/listings/f.json": __vite_glob_0_1 });
  const listings = Object.keys(modules).map((key) => {
    var _a;
    const url = `/listings/${(_a = key.split("/").at(-1)) == null ? void 0 : _a.split(".").at(0)}`;
    return { ...modules[key], json_url: key, url };
  });
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

import { _ as __vite_glob_0_0, a as __vite_glob_0_1 } from "../../../../chunks/f.js";
import { c as create_ssr_component, e as escape, f as add_attribute } from "../../../../chunks/index.js";
/* empty css                                                              */import "marked";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const modules = /* @__PURE__ */ Object.assign({ "/src/lib/content/listings/df.json": __vite_glob_0_0, "/src/lib/content/listings/f.json": __vite_glob_0_1 });
  const listing = modules[`/src/lib/content/listings/${data.title}.json`];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1>Setup</h1>
<p>Here are the steps to set up svelte-marked plugi</p>
<ol><li>Install it</li>
<li>Enjoy<ul><li>If you enjoyed, make sure to star the repo!</li></ul></li></ol>
<h1>Uses</h1>
<p><strong>Here\u2019s some stuff I use</strong></p>
<ul><li>SvelteKit</li>
<li>VS Code</li>
<li>Emojis \u{1F60E}</li></ul>
<h1>${escape(data.title)}</h1>
<div class="${"p-5"}"><a${add_attribute("href", listing.url, 0)} class="${"text-xl font-bold"}">${escape(listing.title)}</a>
	<p class="${"mt-1 text-sm"}">${escape(listing.body)}</p>
	<img${add_attribute("src", listing.thumbnail, 0)} alt="${""}" class="${"h-40"}"></div>`;
});
export {
  Page as default
};

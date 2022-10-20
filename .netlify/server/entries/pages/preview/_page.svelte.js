import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../chunks/index.js";
import MarkdownIt from "markdown-it";
import "marked";
import { M as Markdown } from "../../../chunks/Markdown.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url($lib/css/github-markdown.css);",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const options = { breaks: true };
  let md = new MarkdownIt(options);
  let previewData = {};
  $$result.css.add(css);
  return `<h1>Success!!</h1>
${validate_component(Markdown, "Markdown").$$render(
    $$result,
    {
      source: `
# Setup
Here are the steps to set up svelte-marked plugin
1. Install it
2. Enjoy
    - If you enjoyed, make sure to star the repo!
`
    },
    {},
    {}
  )}


<ul>${each(Object.entries(previewData), ([key, value], index) => {
    return `<h6>${escape(index)}) ${escape(key)}</h6>
		${key === "body" ? `
			<div class="${"markdown-body"}"><!-- HTML_TAG_START -->${md.render(value)}<!-- HTML_TAG_END --></div>
			` : `<p>${escape(value)}</p>`}`;
  })}</ul>



${previewData.type === "team" ? `` : ``}`;
});
export {
  Page as default
};

import { c as create_ssr_component, d as each, e as escape } from "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let previewData = {};
  return `
<ul>${each(Object.entries(previewData), ([key, value], index) => {
    return `<h6>${escape(index)}) ${escape(key)}</h6>
		${key === "body" ? `<div class="${"prose prose-li:m-0 prose-p:m-0"}"><!-- HTML_TAG_START -->${value.replace(/\n(?=\n)/g, "<br/>")}<!-- HTML_TAG_END -->
				</div>
			` : `<p>${escape(value)}</p>`}`;
  })}</ul>



${previewData.type === "team" ? `` : ``}`;
});
export {
  Page as default
};

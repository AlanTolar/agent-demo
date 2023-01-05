import { c as create_ssr_component, e as escape, v as validate_component, d as each, f as add_attribute } from "../../../../chunks/index.js";
const HeroSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Title goes here" } = $$props;
  let { subtitle = "Subtitle goes here" } = $$props;
  let { coverImgUrl = "/people-talking.jpeg" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.coverImgUrl === void 0 && $$bindings.coverImgUrl && coverImgUrl !== void 0)
    $$bindings.coverImgUrl(coverImgUrl);
  return `<section id="${"hero-section"}" class="${"bg-[url('" + escape(coverImgUrl, true) + "')] bg-cover bg-center"}"><div class="${"custom-container"}"><div class="${"w-full max-w-[450px] bg-primary-800/60 py-16 sm:py-24 px-12 backdrop-blur"}"><h1 class="${"mb-6 text-white display-text"}">${escape(title)}</h1>
			<p class="${"text-white subtitle-text"}">${escape(subtitle)}</p></div></div></section>

`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let agents = data.agents;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(HeroSection, "HeroSection").$$render(
    $$result,
    {
      title: "Find an Agent",
      subtitle: "We know the ins and outs of the market"
    },
    {},
    {}
  )}

<div class="${"flex flex-col gap-8 p-20"}"><h1 class="${"text-4xl font-bold text-neutral-800"}">Agents</h1>
	${each(agents, (agent) => {
    return `<a${add_attribute("href", agent.url, 0)} class="${"underline"}">${escape(agent.name)}</a>`;
  })}</div>`;
});
export {
  Page as default
};

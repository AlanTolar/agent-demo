import { c as create_ssr_component, f as add_attribute, i as is_void, d as each, v as validate_component, m as missing_component, e as escape } from "../../../chunks/index.js";
import MarkdownIt from "markdown-it";
import { marked, Slugger } from "marked";
/* empty css                                                           */function joinUrlPaths(...paths) {
  return "/" + paths.flatMap((path) => path.split("/")).filter((path) => !!path).join("/");
}
function isRelative(url) {
  return url.startsWith("/") || url.startsWith("#");
}
function generatePathSegment(name, slugger) {
  return slugger.slug(name).replace(/--+/g, "-");
}
const MarkdownHeading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  let { options } = $$props;
  const renderers = void 0;
  let id;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  id = generatePathSegment(token.text, options.slugger);
  return `${((tag) => {
    return tag ? `<${`h${token.depth}`}${add_attribute("id", id, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(`h${token.depth}`)}`;
});
const MarkdownBloquote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<blockquote>${slots.default ? slots.default({}) : ``}</blockquote>`;
});
const MarkdownTokens = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tokens } = $$props;
  let { renderers } = $$props;
  let { options } = $$props;
  if ($$props.tokens === void 0 && $$bindings.tokens && tokens !== void 0)
    $$bindings.tokens(tokens);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  return `${tokens ? `${each(tokens, (token) => {
    return `${validate_component(MarkdownToken, "MarkdownToken").$$render($$result, { token, renderers, options }, {}, {})}`;
  })}` : ``}`;
});
const MarkdownToken = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  let { renderers } = $$props;
  let { options } = $$props;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  return `${renderers[token.type] ? `${validate_component(renderers[token.type] || missing_component, "svelte:component").$$render($$result, { token, options, renderers }, {}, {
    default: () => {
      return `${"tokens" in token && token["tokens"] ? `${validate_component(MarkdownTokens, "MarkdownTokens").$$render(
        $$result,
        {
          tokens: token["tokens"],
          renderers,
          options
        },
        {},
        {}
      )}` : `${escape(token.raw)}`}`;
    }
  })}` : ``}`;
});
const MarkdownList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  let { options } = $$props;
  let { renderers } = $$props;
  let component;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  component = token.ordered ? "ol" : "ul";
  return `${((tag) => {
    return tag ? `<${component}${add_attribute("start", token.start || 1, 0)}>${is_void(tag) ? "" : `${each(token.items, (item) => {
      return `${validate_component(MarkdownToken, "MarkdownToken").$$render($$result, { token: { ...item }, options, renderers }, {}, {})}`;
    })}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(component)}`;
});
const MarkdownListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<li>${slots.default ? slots.default({}) : ``}</li>`;
});
const MarkdownBr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<br>`;
});
const MarkdownCode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<pre><code${add_attribute("class", `lang-${token.lang}`, 0)}>${escape(token.text)}</code></pre>`;
});
const MarkdownCodeSpan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<code>${escape(token.raw.slice(1, token.raw.length - 1))}</code>`;
});
const MarkdownTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  let { options } = $$props;
  let { renderers } = $$props;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<table><thead><tr>${each(token.header, (item) => {
    return `<th scope="${"col"}">${validate_component(MarkdownTokens, "MarkdownTokens").$$render($$result, { tokens: item.tokens, options, renderers }, {}, {})}
        </th>`;
  })}</tr></thead>
  <tbody>${each(token.rows, (row) => {
    return `<tr>${each(row, (col) => {
      return `<td>${validate_component(MarkdownTokens, "MarkdownTokens").$$render($$result, { tokens: col.tokens, options, renderers }, {}, {})}
          </td>`;
    })}
      </tr>`;
  })}</tbody></table>`;
});
const MarkdownHtml = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<!-- HTML_TAG_START -->${token.text}<!-- HTML_TAG_END -->`;
});
const MarkdownParagraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<p>${slots.default ? slots.default({}) : ``}</p>`;
});
const MarkdownLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  let { options } = $$props;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<a${add_attribute(
    "href",
    isRelative(token.href) ? joinUrlPaths(options.baseUrl, token.href) : token.href,
    0
  )}${add_attribute("title", token.title, 0)}>${slots.default ? slots.default({}) : ``}</a>`;
});
const MarkdownText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `${slots.default ? slots.default({}) : ``}`;
});
const MarkdownDfn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<dfn>${slots.default ? slots.default({}) : ``}</dfn>`;
});
const MarkdownDel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<del>${slots.default ? slots.default({}) : ``}</del>`;
});
const MarkdownEm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<em>${slots.default ? slots.default({}) : ``}</em>`;
});
const MarkdownHr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<hr>`;
});
const MarkdownStrong = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `<strong>${slots.default ? slots.default({}) : ``}</strong>`;
});
const css = {
  code: ".markdown-image.svelte-1jush36{max-width:100%}",
  map: null
};
const MarkdownImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  $$result.css.add(css);
  return `<img${add_attribute("src", token.href, 0)}${add_attribute("title", token.title, 0)}${add_attribute("alt", token.text, 0)} class="${"markdown-image svelte-1jush36"}">`;
});
const MarkdownSpace = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const token = void 0;
  const options = void 0;
  const renderers = void 0;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `${slots.default ? slots.default({}) : ``}`;
});
function parse(src) {
  const lexer = new marked.Lexer();
  return lexer.lex(src);
}
const defaultRenderers = () => ({
  heading: MarkdownHeading,
  blockquote: MarkdownBloquote,
  list: MarkdownList,
  list_item: MarkdownListItem,
  br: MarkdownBr,
  code: MarkdownCode,
  codespan: MarkdownCodeSpan,
  table: MarkdownTable,
  html: MarkdownHtml,
  paragraph: MarkdownParagraph,
  link: MarkdownLink,
  text: MarkdownText,
  def: MarkdownDfn,
  del: MarkdownDel,
  em: MarkdownEm,
  hr: MarkdownHr,
  strong: MarkdownStrong,
  image: MarkdownImage,
  space: MarkdownSpace,
  escape: MarkdownSpace
});
const defaultOptions = () => ({
  baseUrl: "/",
  slugger: new Slugger()
});
function suppressWarnings() {
  const origWarn = console.warn;
  console.warn = (message) => {
    if (message.includes("unknown prop"))
      return;
    if (message.includes("unexpected slot"))
      return;
    origWarn(message);
  };
}
const Markdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { source } = $$props;
  let { options = {} } = $$props;
  let { renderers = {} } = $$props;
  let tokens;
  let actualRenderers;
  let actualOptions;
  suppressWarnings();
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  {
    {
      tokens = parse(source);
      actualRenderers = { ...defaultRenderers(), ...renderers };
      actualOptions = { ...defaultOptions(), ...options };
    }
  }
  return `${validate_component(MarkdownTokens, "MarkdownTokens").$$render(
    $$result,
    {
      tokens,
      renderers: actualRenderers,
      options: actualOptions
    },
    {},
    {}
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const options = { breaks: true };
  let md = new MarkdownIt(options);
  let previewData = {};
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
			<!-- HTML_TAG_START -->${md.render(value)}<!-- HTML_TAG_END -->
			` : `<p>${escape(value)}</p>`}`;
  })}</ul>



${previewData.type === "team" ? `` : ``}`;
});
export {
  Page as default
};

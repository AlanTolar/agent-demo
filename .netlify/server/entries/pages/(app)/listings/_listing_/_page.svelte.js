import { _ as __vite_glob_0_0, a as __vite_glob_0_1, b as __vite_glob_0_2, c as __vite_glob_0_3, d as __vite_glob_0_4, e as __vite_glob_0_5, f as __vite_glob_0_6, g as __vite_glob_0_7, h as __vite_glob_0_8, i as __vite_glob_0_9 } from "../../../../../chunks/the-strawberry-farm.js";
import { c as create_ssr_component, f as add_attribute, i as is_void, d as each, v as validate_component, m as missing_component, e as escape, h as compute_rest_props, g as getContext, j as createEventDispatcher, s as setContext, b as subscribe } from "../../../../../chunks/index.js";
import { marked, Slugger, Lexer } from "marked";
import { p as page } from "../../../../../chunks/stores.js";
function joinUrlPaths(...paths) {
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
const MarkdownImage_svelte_svelte_type_style_lang = "";
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
const defaultRenderers$1 = () => ({
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
const defaultOptions$1 = () => ({
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
      actualRenderers = { ...defaultRenderers$1(), ...renderers };
      actualOptions = { ...defaultOptions$1(), ...options };
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
function supressWarnings() {
  const origWarn = console.warn;
  console.warn = (message) => {
    if (message.includes("unknown prop"))
      return;
    if (message.includes("unexpected slot"))
      return;
    origWarn(message);
  };
}
const Parser = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "tokens", "header", "rows", "ordered", "renderers"]);
  let { type = void 0 } = $$props;
  let { tokens = void 0 } = $$props;
  let { header = void 0 } = $$props;
  let { rows = void 0 } = $$props;
  let { ordered = false } = $$props;
  let { renderers } = $$props;
  supressWarnings();
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.tokens === void 0 && $$bindings.tokens && tokens !== void 0)
    $$bindings.tokens(tokens);
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.ordered === void 0 && $$bindings.ordered && ordered !== void 0)
    $$bindings.ordered(ordered);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  return `${!type ? `${each(tokens, (token) => {
    return `${validate_component(Parser, "svelte:self").$$render($$result, Object.assign(token, { renderers }), {}, {})}`;
  })}` : `${renderers[type] ? `${type === "table" ? `${validate_component(renderers.table || missing_component, "svelte:component").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(renderers.tablehead || missing_component, "svelte:component").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(renderers.tablerow || missing_component, "svelte:component").$$render($$result, {}, {}, {
            default: () => {
              return `${each(header, (headerItem, i) => {
                return `${validate_component(renderers.tablecell || missing_component, "svelte:component").$$render(
                  $$result,
                  {
                    header: true,
                    align: $$restProps.align[i] || "center"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(Parser, "svelte:self").$$render($$result, { tokens: headerItem.tokens, renderers }, {}, {})}
              `;
                    }
                  }
                )}`;
              })}`;
            }
          })}`;
        }
      })}
        ${validate_component(renderers.tablebody || missing_component, "svelte:component").$$render($$result, {}, {}, {
        default: () => {
          return `${each(rows, (row) => {
            return `${validate_component(renderers.tablerow || missing_component, "svelte:component").$$render($$result, {}, {}, {
              default: () => {
                return `${each(row, (cells, i) => {
                  return `${validate_component(renderers.tablecell || missing_component, "svelte:component").$$render(
                    $$result,
                    {
                      header: false,
                      align: $$restProps.align[i] || "center"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Parser, "svelte:self").$$render($$result, { tokens: cells.tokens, renderers }, {}, {})}
                `;
                      }
                    }
                  )}`;
                })}
            `;
              }
            })}`;
          })}`;
        }
      })}`;
    }
  })}` : `${type === "list" ? `${ordered ? `${validate_component(renderers.list || missing_component, "svelte:component").$$render($$result, Object.assign({ ordered }, $$restProps), {}, {
    default: () => {
      return `${each($$restProps.items, (item) => {
        return `${validate_component(renderers.orderedlistitem || renderers.listitem || missing_component, "svelte:component").$$render($$result, Object.assign(item), {}, {
          default: () => {
            return `${validate_component(Parser, "svelte:self").$$render($$result, { tokens: item.tokens, renderers }, {}, {})}
            `;
          }
        })}`;
      })}`;
    }
  })}` : `${validate_component(renderers.list || missing_component, "svelte:component").$$render($$result, Object.assign({ ordered }, $$restProps), {}, {
    default: () => {
      return `${each($$restProps.items, (item) => {
        return `${validate_component(renderers.unorderedlistitem || renderers.listitem || missing_component, "svelte:component").$$render($$result, Object.assign(item), {}, {
          default: () => {
            return `${validate_component(Parser, "svelte:self").$$render($$result, { tokens: item.tokens, renderers }, {}, {})}
            `;
          }
        })}`;
      })}`;
    }
  })}`}` : `${validate_component(renderers[type] || missing_component, "svelte:component").$$render($$result, Object.assign($$restProps), {}, {
    default: () => {
      return `${tokens ? `${validate_component(Parser, "svelte:self").$$render($$result, { tokens, renderers }, {}, {})}` : `${escape($$restProps.raw)}`}`;
    }
  })}`}`}` : ``}`}`;
});
const key = {};
const Heading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let id;
  let { depth } = $$props;
  let { raw } = $$props;
  let { text } = $$props;
  const { slug, getOptions } = getContext(key);
  const options = getOptions();
  if ($$props.depth === void 0 && $$bindings.depth && depth !== void 0)
    $$bindings.depth(depth);
  if ($$props.raw === void 0 && $$bindings.raw && raw !== void 0)
    $$bindings.raw(raw);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  id = options.headerIds ? options.headerPrefix + slug(text) : void 0;
  return `${depth === 1 ? `<h1${add_attribute("id", id, 0)}>${slots.default ? slots.default({}) : ``}</h1>` : `${depth === 2 ? `<h2${add_attribute("id", id, 0)}>${slots.default ? slots.default({}) : ``}</h2>` : `${depth === 3 ? `<h3${add_attribute("id", id, 0)}>${slots.default ? slots.default({}) : ``}</h3>` : `${depth === 4 ? `<h4${add_attribute("id", id, 0)}>${slots.default ? slots.default({}) : ``}</h4>` : `${depth === 5 ? `<h5${add_attribute("id", id, 0)}>${slots.default ? slots.default({}) : ``}</h5>` : `${depth === 6 ? `<h6${add_attribute("id", id, 0)}>${slots.default ? slots.default({}) : ``}</h6>` : `${escape(raw)}`}`}`}`}`}`}`;
});
const Paragraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p>${slots.default ? slots.default({}) : ``}</p>`;
});
const Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text } = $$props;
  let { raw } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.raw === void 0 && $$bindings.raw && raw !== void 0)
    $$bindings.raw(raw);
  return `${slots.default ? slots.default({}) : ``}`;
});
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href = "" } = $$props;
  let { title = void 0 } = $$props;
  let { text = "" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  return `<img${add_attribute("src", href, 0)}${add_attribute("title", title, 0)}${add_attribute("alt", text, 0)}>`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href = "" } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<a${add_attribute("href", href, 0)}${add_attribute("title", title, 0)}>${slots.default ? slots.default({}) : ``}</a>`;
});
const Em = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<em>${slots.default ? slots.default({}) : ``}</em>`;
});
const Del = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<del>${slots.default ? slots.default({}) : ``}</del>`;
});
const Codespan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { raw } = $$props;
  if ($$props.raw === void 0 && $$bindings.raw && raw !== void 0)
    $$bindings.raw(raw);
  return `<code>${escape(raw.replace(/`/g, ""))}</code>`;
});
const Strong = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<strong>${slots.default ? slots.default({}) : ``}</strong>`;
});
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<table>${slots.default ? slots.default({}) : ``}</table>`;
});
const TableHead = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<thead>${slots.default ? slots.default({}) : ``}</thead>`;
});
const TableBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<tbody>${slots.default ? slots.default({}) : ``}</tbody>`;
});
const TableRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<tr>${slots.default ? slots.default({}) : ``}</tr>`;
});
const TableCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { header } = $$props;
  let { align } = $$props;
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  return `${header ? `<th${add_attribute("align", align, 0)}>${slots.default ? slots.default({}) : ``}</th>` : `<td${add_attribute("align", align, 0)}>${slots.default ? slots.default({}) : ``}</td>`}`;
});
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ordered } = $$props;
  let { start } = $$props;
  if ($$props.ordered === void 0 && $$bindings.ordered && ordered !== void 0)
    $$bindings.ordered(ordered);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0)
    $$bindings.start(start);
  return `${ordered ? `<ol${add_attribute("start", start, 0)}>${slots.default ? slots.default({}) : ``}</ol>` : `<ul>${slots.default ? slots.default({}) : ``}</ul>`}`;
});
const ListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<li>${slots.default ? slots.default({}) : ``}</li>`;
});
const Hr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<hr>`;
});
const Html = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  return `<!-- HTML_TAG_START -->${text}<!-- HTML_TAG_END -->`;
});
const Blockquote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<blockquote>${slots.default ? slots.default({}) : ``}</blockquote>`;
});
const Code = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { lang } = $$props;
  let { text } = $$props;
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  return `<pre${add_attribute("class", lang, 0)}><code>${escape(text)}</code></pre>`;
});
const Br = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<br>${slots.default ? slots.default({}) : ``}`;
});
const defaultRenderers = {
  heading: Heading,
  paragraph: Paragraph,
  text: Text,
  image: Image,
  link: Link,
  em: Em,
  strong: Strong,
  codespan: Codespan,
  del: Del,
  table: Table,
  tablehead: TableHead,
  tablebody: TableBody,
  tablerow: TableRow,
  tablecell: TableCell,
  list: List,
  orderedlistitem: null,
  unorderedlistitem: null,
  listitem: ListItem,
  hr: Hr,
  html: Html,
  blockquote: Blockquote,
  code: Code,
  br: Br
};
const defaultOptions = {
  baseUrl: null,
  breaks: false,
  gfm: true,
  headerIds: true,
  headerPrefix: "",
  highlight: null,
  langPrefix: "language-",
  mangle: true,
  pedantic: false,
  renderer: null,
  sanitize: false,
  sanitizer: null,
  silent: false,
  smartLists: false,
  smartypants: false,
  tokenizer: null,
  xhtml: false
};
const SvelteMarkdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let preprocessed;
  let slugger;
  let combinedOptions;
  let combinedRenderers;
  let { source = [] } = $$props;
  let { renderers = {} } = $$props;
  let { options = {} } = $$props;
  let { isInline = false } = $$props;
  const dispatch = createEventDispatcher();
  let tokens;
  let lexer;
  setContext(key, {
    slug: (val) => slugger ? slugger.slug(val) : "",
    getOptions: () => combinedOptions
  });
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.renderers === void 0 && $$bindings.renderers && renderers !== void 0)
    $$bindings.renderers(renderers);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.isInline === void 0 && $$bindings.isInline && isInline !== void 0)
    $$bindings.isInline(isInline);
  preprocessed = Array.isArray(source);
  slugger = source ? new Slugger() : void 0;
  combinedOptions = { ...defaultOptions, ...options };
  {
    if (preprocessed) {
      tokens = source;
    } else {
      lexer = new Lexer(combinedOptions);
      tokens = isInline ? lexer.inlineTokens(source) : lexer.lex(source);
      dispatch("parsed", { tokens });
    }
  }
  combinedRenderers = { ...defaultRenderers, ...renderers };
  return `${validate_component(Parser, "Parser").$$render($$result, { tokens, renderers: combinedRenderers }, {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const source = `
  # This is a header

This is a paragraph.

* This is a list
* With two items
  1. And a sublist
  2. That is ordered
    * With another
    * Sublist inside

| And this is | A table |
|-------------|---------|
| With two    | columns |
`;
  const options = { langPrefix: "markdown-body" };
  const modules = /* @__PURE__ */ Object.assign({ "/src/lib/content/listings/the-cotton-patch.json": __vite_glob_0_0, "/src/lib/content/listings/the-cypress-swamp.json": __vite_glob_0_1, "/src/lib/content/listings/the-dogwood-farm.json": __vite_glob_0_2, "/src/lib/content/listings/the-magnolia-farm.json": __vite_glob_0_3, "/src/lib/content/listings/the-old-mill-place.json": __vite_glob_0_4, "/src/lib/content/listings/the-ozark-mountain-retreat.json": __vite_glob_0_5, "/src/lib/content/listings/the-peanut-farm.json": __vite_glob_0_6, "/src/lib/content/listings/the-pecan-orchard.json": __vite_glob_0_7, "/src/lib/content/listings/the-river-farm.json": __vite_glob_0_8, "/src/lib/content/listings/the-strawberry-farm.json": __vite_glob_0_9 });
  const listing = modules[`/src/lib/content/listings/${$page.params.listing}.json`];
  $$unsubscribe_page();
  return `<div class="${"prose"}">${validate_component(SvelteMarkdown, "SvelteMarkdown").$$render($$result, { source, options }, {}, {})}</div>

<div class="${"prose"}">${validate_component(Markdown, "Markdown").$$render(
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
  )}</div>

<h1>${escape($page.params.listing)}</h1>
<div class="${"p-5"}"><a${add_attribute("href", listing.url, 0)} class="${"text-xl font-bold"}">${escape(listing.title)}</a>
	<p class="${"mt-1 text-sm"}">${escape(listing.body)}</p>
	<img${add_attribute("src", listing.thumbnail, 0)} alt="${""}" class="${"h-40"}"></div>`;
});
export {
  Page as default
};

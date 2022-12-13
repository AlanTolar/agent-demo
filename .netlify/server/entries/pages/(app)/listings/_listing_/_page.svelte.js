import { _ as __vite_glob_0_0, a as __vite_glob_0_1, b as __vite_glob_0_2, c as __vite_glob_0_3, d as __vite_glob_0_4, e as __vite_glob_0_5, f as __vite_glob_0_6, g as __vite_glob_0_7, h as __vite_glob_0_8, i as __vite_glob_0_9 } from "../../../../../chunks/the-strawberry-farm.js";
import { c as create_ssr_component, b as subscribe, e as escape, d as each, f as add_attribute } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
const main_image = 20;
const color = "red-900";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const modules = /* @__PURE__ */ Object.assign({ "/src/lib/content/listings/the-cotton-patch.json": __vite_glob_0_0, "/src/lib/content/listings/the-cypress-swamp.json": __vite_glob_0_1, "/src/lib/content/listings/the-dogwood-farm.json": __vite_glob_0_2, "/src/lib/content/listings/the-magnolia-farm.json": __vite_glob_0_3, "/src/lib/content/listings/the-old-mill-place.json": __vite_glob_0_4, "/src/lib/content/listings/the-ozark-mountain-retreat.json": __vite_glob_0_5, "/src/lib/content/listings/the-peanut-farm.json": __vite_glob_0_6, "/src/lib/content/listings/the-pecan-orchard.json": __vite_glob_0_7, "/src/lib/content/listings/the-river-farm.json": __vite_glob_0_8, "/src/lib/content/listings/the-strawberry-farm.json": __vite_glob_0_9 });
  const listing = modules[`/src/lib/content/listings/${$page.params.listing}.json`];
  $$unsubscribe_page();
  return `<section><div class="${"bg-" + escape(color, true)}">${escape(main_image)}</div>

	<div class="${"flex relative overflow-hidden"}">${listing.slideshow_images ? `${each(listing.slideshow_images, (images, index) => {
    return `
				<img class="${"h-[" + escape(main_image, true) + "px]"}"${add_attribute("src", images, 0)} alt="${""}">`;
  })}` : ``}
		
		<button class="${"absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 p-2 bg-primary-600 rounded-full button-elevated"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" preserveAspectRatio="${"xMidYMid meet"}" viewBox="${"0 0 24 24"}" class="${"w-full text-neutral-100"}" stroke="${"currentColor"}"><path fill="${"currentColor"}" d="${"m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"}"></path></svg>
			<span class="${"sr-only"}">Previous</span></button>
		<button class="${"absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 p-2 bg-primary-600 rounded-full button-elevated"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" preserveAspectRatio="${"xMidYMid meet"}" viewBox="${"0 0 24 24"}" class="${"w-full text-neutral-100"}" stroke="${"currentColor"}"><path fill="${"currentColor"}" d="${"M11.3 19.3q-.275-.275-.288-.7q-.012-.425.263-.7l4.9-4.9H5q-.425 0-.713-.288Q4 12.425 4 12t.287-.713Q4.575 11 5 11h11.175l-4.9-4.9q-.275-.275-.263-.7q.013-.425.288-.7q.275-.275.7-.275q.425 0 .7.275l6.6 6.6q.15.125.213.312q.062.188.062.388t-.062.375q-.063.175-.213.325l-6.6 6.6q-.275.275-.7.275q-.425 0-.7-.275Z"}"></path></svg>
			<span class="${"sr-only"}">Next</span></button></div></section>

<section><h3>Description</h3>
	<p class="${"prose main-paragraph"}"><!-- HTML_TAG_START -->${listing.description}<!-- HTML_TAG_END --></p></section>

<section><h3>Details</h3>
	<p class="${"prose main-paragraph"}"><!-- HTML_TAG_START -->${listing.details}<!-- HTML_TAG_END --></p></section>

<section><h3 class="${"heading-text"}">Summary</h3>
	<div><div><div>${"feature_categories" in listing.summary ? `<h4 class="${"subtitle-text"}">Property</h4>
					${each(listing.summary.feature_categories, (feature) => {
    return `<h5 class="${"font-bold"}">${escape(feature.feature_category)}</h5>
						<div>${escape(feature.features)}</div>`;
  })}` : ``}</div>
			<div>${"land_details" in listing.summary ? `<h4 class="${"subtitle-text"}">Land Details</h4>
					${each(listing.summary.land_details, (land_detail) => {
    return `<div>${escape(land_detail)}</div>`;
  })}` : ``}</div>
			<div>${"distances" in listing.summary ? `<h4 class="${"subtitle-text"}">Distances</h4>
					${each(listing.summary.distances, (distances) => {
    return `<p>${escape(distances.distance)} from ${escape(distances.location)}</p>`;
  })}` : ``}</div></div>
		<div><div>${"utilities" in listing.summary ? `<h4 class="${"subtitle-text"}">Utilities</h4>
					${each(listing.summary.utilities, (utilities) => {
    return `<p>${escape(utilities.utility)}: ${escape(utilities.availability)}</p>`;
  })}` : ``}</div>
			<div>${"housing" in listing.summary ? `<h4 class="${"subtitle-text"}">Housing</h4>
					${each(listing.summary.housing, (housing) => {
    return `<div>${escape(housing)}</div>`;
  })}` : ``}</div>
			<div>${"improvements" in listing.summary ? `<h4 class="${"subtitle-text"}">Improvements</h4>
					${each(listing.summary.improvements, (improvements) => {
    return `<div>${escape(improvements)}</div>`;
  })}` : ``}</div></div></div></section>

<section>${listing.brouchure ? `<a${add_attribute("href", listing.brouchure, 0)} class="${"text-white button button-elevated bg-primary-600 w-fit md:self-center"}">Download Files</a>` : ``}
	${listing.location ? `<a${add_attribute("href", listing.location, 0)} class="${"text-white button button-elevated bg-primary-600 w-fit md:self-center"}">Get Directions</a>` : ``}</section>`;
});
export {
  Page as default
};

import { c as create_ssr_component, g as getContext, b as subscribe, e as escape, f as add_attribute, d as each } from "../../../../../chunks/index.js";
import numbro from "numbro";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let contentCovered;
  let $scroll, $$unsubscribe_scroll;
  let { data } = $$props;
  let listing = data.listing;
  let agent = data.agent;
  console.log("agent: ", agent);
  console.log("listing: ", listing);
  let scroll = getContext("scroll");
  $$unsubscribe_scroll = subscribe(scroll, (value) => $scroll = value);
  let imgElem1, imgElem2, imgElem3, imgElem4, imgElem5;
  function getImg(i) {
    const imgURL = listing?.slideshowImages?.at(i % listing.slideshowImages.length) || "/placeholder.webp";
    return imgURL;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  contentCovered = $scroll !== 0;
  $$unsubscribe_scroll();
  return `${listing ? `<div class="${"sticky top-0 z-40 " + escape(contentCovered ? "bg-neutral-200" : "", true)}"><div class="${"h-20 max-w-screen-xl mx-auto"}"><div class="${"flex justify-center w-[100%] px-7 xl:px-0 h-full"}"><div class="${"px-3 w-full xl:w-8/12 shrink-0 flex justify-between gap-x-8 align-middle whitespace-nowrap flex-wrap"}"><h1 class="${"self-center heading-text"}">${escape(listing.title)}</h1>

					<div class="${"self-center flex items-center gap-2 lg:gap-4 subtitle-text font-bold flex-wrap"}"><span>${escape(numbro(listing.acres).format({ thousandSeparated: true }))} acres</span>
						<svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-3"}" preserveAspectRatio="${"xMidYMid meet"}" viewBox="${"0 0 32 32"}"><circle cx="${"16"}" cy="${"16"}" r="${"8"}" fill="${"currentColor"}"></circle></svg>

						<span>${escape(numbro(listing.price).formatCurrency({ thousandSeparated: true }))}</span>
						<svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-3"}" preserveAspectRatio="${"xMidYMid meet"}" viewBox="${"0 0 32 32"}"><circle cx="${"16"}" cy="${"16"}" r="${"8"}" fill="${"currentColor"}"></circle></svg>
						<span>${escape(listing.address.city)}, ${escape(listing.address.state)}</span></div></div>
				<div class="${"hidden xl:block w-4/12 shrink-0 px-3"}"></div></div></div></div>

	<div class="${"overflow-clip"}"><div class="${"flex relative justify-center mt-1 max-w-screen-xl mx-auto"}">
			<div class="${"relative w-full xl:w-8/12 shrink-0 carousel-item"}"><div class="${"aspect-w-5 aspect-h-3"}"><img class="${"h-full " + escape("object-cover", true)}"${add_attribute("src", getImg(-2), 0)} alt="${""}"${add_attribute("this", imgElem1, 0)}></div>
				${``}</div>
			<div class="${"relative w-full xl:w-8/12 shrink-0 carousel-item"}"><div class="${"aspect-w-5 aspect-h-3"}"><img class="${"h-full " + escape("object-cover", true) + " " + escape("", true)}"${add_attribute("src", getImg(-1), 0)} alt="${""}"${add_attribute("this", imgElem2, 0)}></div>
				${``}</div>
			<div class="${"shrink-0 flex justify-center w-[100%] flex-col xl:flex-row"}"><div class="${"relative w-full xl:w-8/12 shrink-0 carousel-item"}"><div class="${"aspect-w-5 aspect-h-3"}">
						<div class="${"h-full w-full"}"><button class="${"absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-12 h-12 p-2 bg-primary-600 disabled:bg-primary-800 rounded-full drop-shadow-xl shine z-20"}" ${""}><svg xmlns="${"http://www.w3.org/2000/svg"}" preserveAspectRatio="${"xMidYMid meet"}" viewBox="${"0 0 24 24"}" class="${"w-full text-neutral-100"}" stroke="${"currentColor"}"><path fill="${"currentColor"}" d="${"m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"}"></path></svg>
								<span class="${"sr-only"}">Previous</span></button>
							<button class="${"absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-12 h-12 p-2 bg-primary-600 disabled:bg-primary-800 rounded-full drop-shadow-xl shine z-20"}" ${""}><svg xmlns="${"http://www.w3.org/2000/svg"}" preserveAspectRatio="${"xMidYMid meet"}" viewBox="${"0 0 24 24"}" class="${"w-full text-neutral-100"}" stroke="${"currentColor"}"><path fill="${"currentColor"}" d="${"M11.3 19.3q-.275-.275-.288-.7q-.012-.425.263-.7l4.9-4.9H5q-.425 0-.713-.288Q4 12.425 4 12t.287-.713Q4.575 11 5 11h11.175l-4.9-4.9q-.275-.275-.263-.7q.013-.425.288-.7q.275-.275.7-.275q.425 0 .7.275l6.6 6.6q.15.125.213.312q.062.188.062.388t-.062.375q-.063.175-.213.325l-6.6 6.6q-.275.275-.7.275q-.425 0-.7-.275Z"}"></path></svg>
								<span class="${"sr-only"}">Next</span></button></div>
						<img class="${"h-full " + escape("object-cover", true) + " " + escape("", true)}"${add_attribute("src", getImg(0), 0)} alt="${""}"${add_attribute("this", imgElem3, 0)}></div>
					${``}

					<div id="${"main-content-container"}" class="${"flex flex-col py-10 max-w-[800px] mx-auto divide-y"}">${listing.description ? `<section id="${"description-section"}" class="${"py-10"}"><h3 class="${"heading-text-sm"}">Description</h3>
								<div class="${"mt-4 prose main-paragraph max-w-none"}"><!-- HTML_TAG_START -->${listing.description}<!-- HTML_TAG_END --></div></section>` : ``}
						${listing.details ? `<section id="${"details-section"}" class="${"py-10"}"><h3 class="${"heading-text-sm"}">Details</h3>
								<div class="${"mt-4 prose main-paragraph max-w-none"}"><!-- HTML_TAG_START -->${listing.details}<!-- HTML_TAG_END --></div></section>` : ``}
						${listing.summary ? `<section id="${"summary-section"}" class="${"py-10"}"><h3 class="${"heading-text-sm"}">Summary</h3>
								<div class="${"mt-4 grid sm:grid-cols-2 gap-6"}"><div class="${"flex flex-col gap-6"}"><div class="${"flex"}"><iconify-icon icon="${"ph:tree-bold"}" class="${"py-1 pr-4"}" width="${"40"}"></iconify-icon>
											<div>${listing.summary.featureCategories ? `<h4 class="${"subtitle-text"}">Property</h4>
													<div class="${"mt-2 flex flex-col gap-2"}">${each(listing.summary.featureCategories, (feature) => {
    return `<div><h5 class="${"font-bold"}">${escape(feature.featureCategory)}</h5>
																<p>${escape(feature.features)}</p>
															</div>`;
  })}</div>` : ``}</div></div>
										<div class="${"flex"}"><iconify-icon icon="${"majesticons:checkbox-list-detail-line"}" class="${"py-1 pr-4"}" width="${"40"}"></iconify-icon>
											<div>${listing.summary.landDetails ? `<h4 class="${"subtitle-text"}">Land Details</h4>
													<div class="${"mt-2"}"><p>${escape(listing.summary.landDetails)}</p></div>` : ``}</div></div>
										<div class="${"flex"}"><iconify-icon icon="${"mingcute:road-line"}" class="${"py-1 pr-4"}" width="${"40"}"></iconify-icon>
											<div>${listing.summary.distances ? `<h4 class="${"subtitle-text"}">Distances</h4>
													<div class="${"mt-2"}">${each(listing.summary.distances, (distances) => {
    return `<p>${escape(distances.distance)} from ${escape(distances.location)}</p>`;
  })}</div>` : ``}</div></div></div>
									<div class="${"flex flex-col gap-6"}"><div class="${"flex"}"><iconify-icon icon="${"eos-icons:pipeline-outlined"}" class="${"py-1 pr-4"}" width="${"40"}"></iconify-icon>
											<div>${listing.summary.utilities ? `<h4 class="${"subtitle-text"}">Utilities</h4>
													<div class="${"mt-2"}">${each(listing.summary.utilities, (utilities) => {
    return `<p>${escape(utilities.utility)}: ${escape(utilities.availability)}</p>`;
  })}</div>` : ``}</div></div>
										<div class="${"flex"}"><iconify-icon icon="${"material-symbols:house-outline"}" class="${"py-1 pr-4"}" width="${"40"}"></iconify-icon>
											<div>${listing.summary.housing ? `<h4 class="${"subtitle-text"}">Housing</h4>
													<div class="${"mt-2"}"><p>${escape(listing.summary.housing)}</p></div>` : ``}</div></div>
										<div class="${"flex"}"><iconify-icon icon="${"material-symbols:trending-up"}" class="${"py-1 pr-4"}" width="${"40"}"></iconify-icon>
											<div>${listing.summary.improvements ? `<h4 class="${"subtitle-text"}">Improvements</h4>
													<div class="${"mt-2"}"><p>${escape(listing.summary.improvements)}</p></div>` : ``}</div></div></div></div></section>` : ``}
						${listing.brouchure || listing.location || listing.address.street ? `<section id="${"further-info-section"}" class="${"py-10"}"><h3 class="${"heading-text-sm"}">Further Information</h3>
								<div class="${"mt-4 grid sm:grid-cols-2 gap-6"}"><div class="${"flex flex-col gap-4 items-center"}">${listing.brouchure ? `<a${add_attribute("href", listing.brouchure, 0)} class="${"text-white button drop-shadow-xl shine bg-primary-600 min-w-[70%] text-center"}"><iconify-icon inline icon="${"ic:baseline-download"}" class="${"mr-2"}"></iconify-icon>Download Files</a>` : ``}
										${listing.location ? `<a${add_attribute("href", listing.location, 0)} class="${"text-white button drop-shadow-xl shine bg-primary-600 min-w-[70%] text-center"}"><iconify-icon inline icon="${"mdi:map-marker"}" class="${"mr-2"}"></iconify-icon>Get Directions</a>` : ``}</div>
									<div class="${"flex justify-center"}"><div><p>${escape(listing.address.street || "")}</p>
											<p>${escape(listing.address.city || "")}, ${escape(listing.address.state || "")}
												${escape(listing.address.postCode || "")}</p>
											<p>${escape(listing.address.county || "")}</p></div></div></div></section>` : ``}</div></div>
				<div class="${"relative w-full xl:w-4/12 shrink-0 carousel-item max-w-[600px] xl:max-w-none mx-auto z-20"}"><div class="${"bg-neutral-200 sticky " + escape(contentCovered ? "top-24" : "", true) + " text-black p-10 rounded-[4%] drop-shadow-lg shine-lg mb-10"}"><div class="${"grid grid-cols-3"}"><div class="${"col-span-1"}"><div class="${"aspect-w-1 aspect-h-1"}"><img class="${"object-cover"}"${add_attribute("src", agent?.image, 0)} alt="${""}"></div></div>
							<div class="${"col-span-2 pl-10 flex flex-col gap-4"}"><div><h2 class="${"heading-text"}">${escape(agent?.name ?? "")}</h2>
									<p class="${"subtitle-text"}">${escape(agent?.phone ?? "")}</p></div>
								${listing.agent ? `<a class="${"label-text underline text-neutral-600 font-semibold"}" href="${"/agents/" + escape(listing?.agent, true)}">View Profile</a>` : ``}</div></div>
						<div class="${"mt-10 flex flex-col gap-6"}"><input class="${"rounded-lg"}" placeholder="${"Full Name"}" type="${"text"}">
							<input class="${"rounded-lg"}" placeholder="${"Email"}" type="${"email"}">
							<input class="${"rounded-lg"}" placeholder="${"Phone Number"}" type="${"tel"}">
							<textarea class="${"rounded-lg"}" placeholder="${"Message"}" rows="${"5"}" cols="${"33"}"></textarea></div></div></div></div>
			<div class="${"relative w-full xl:w-8/12 shrink-0 carousel-item"}"><div class="${"aspect-w-5 aspect-h-3"}"><img class="${"h-full " + escape("object-cover", true) + " " + escape("", true)}"${add_attribute("src", getImg(1), 0)} alt="${""}"${add_attribute("this", imgElem4, 0)}></div>
				${``}</div>
			<div class="${"relative w-full xl:w-8/12 shrink-0 carousel-item"}"><div class="${"aspect-w-5 aspect-h-3"}"><img class="${"h-full " + escape("object-cover", true)}"${add_attribute("src", getImg(2), 0)} alt="${""}"${add_attribute("this", imgElem5, 0)}></div>
				${``}</div></div></div>` : `No Listings`}`;
});
export {
  Page as default
};

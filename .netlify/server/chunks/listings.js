import { _ as __vite_glob_0_0, a as __vite_glob_0_1, b as __vite_glob_0_2, c as __vite_glob_0_3, d as __vite_glob_0_4, e as __vite_glob_0_5, f as __vite_glob_0_6, g as __vite_glob_0_7, h as __vite_glob_0_8, i as __vite_glob_0_9 } from "./the-strawberry-farm.js";
function getListings(num = 100) {
  const modules = /* @__PURE__ */ Object.assign({ "/src/lib/content/listings/the-cotton-patch.json": __vite_glob_0_0, "/src/lib/content/listings/the-cypress-swamp.json": __vite_glob_0_1, "/src/lib/content/listings/the-dogwood-farm.json": __vite_glob_0_2, "/src/lib/content/listings/the-magnolia-farm.json": __vite_glob_0_3, "/src/lib/content/listings/the-old-mill-place.json": __vite_glob_0_4, "/src/lib/content/listings/the-ozark-mountain-retreat.json": __vite_glob_0_5, "/src/lib/content/listings/the-peanut-farm.json": __vite_glob_0_6, "/src/lib/content/listings/the-pecan-orchard.json": __vite_glob_0_7, "/src/lib/content/listings/the-river-farm.json": __vite_glob_0_8, "/src/lib/content/listings/the-strawberry-farm.json": __vite_glob_0_9 });
  let listings = Object.keys(modules).map((key) => {
    var _a;
    const filename = (_a = key.split("/").at(-1)) == null ? void 0 : _a.split(".").at(0);
    const url = `/listings/${filename}`;
    return { ...modules[key], json_url: key, url };
  });
  listings.sort((a, b) => a.date > b.date ? -1 : b.date > a.date ? 1 : 0);
  return listings.slice(0, num);
}
export {
  getListings as g
};

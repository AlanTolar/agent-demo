import { g as getListings } from "../../../chunks/cmsDataHandler.js";
const load = ({ params }) => {
  return {
    listings: getListings()
  };
};
export {
  load
};

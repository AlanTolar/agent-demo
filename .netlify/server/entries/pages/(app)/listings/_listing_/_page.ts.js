import { e as error } from "../../../../../chunks/index2.js";
import { d as getListing, b as getAgent } from "../../../../../chunks/cmsDataHandler.js";
const load = ({ params }) => {
  const listing = getListing(params.listing);
  const agent = getAgent(listing.agent);
  if (listing) {
    return {
      listing,
      agent
    };
  }
  throw error(404, "Not found");
};
export {
  load
};

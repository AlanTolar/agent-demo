import { e as error } from "../../../../../chunks/index2.js";
import { b as getAgent, c as getListingsOfAgent } from "../../../../../chunks/cmsDataHandler.js";
const load = ({ params }) => {
  const agent = getAgent(params.agent).default;
  const listings = getListingsOfAgent(params.agent);
  if (agent) {
    return {
      agent,
      listings
    };
  }
  throw error(404, "Not found");
};
export {
  load
};

import { a as getAgents } from "../../../../chunks/cmsDataHandler.js";
const prerender = true;
const load = ({ params }) => {
  return {
    agents: getAgents()
  };
};
export {
  load,
  prerender
};

import type { PageLoad } from './$types';
import { getAgents } from '$lib/utils/cmsDataHandler';

export const prerender = true;

export const load = (({ params }) => {
	return {
		agents: getAgents(),
	};
}) satisfies PageLoad;

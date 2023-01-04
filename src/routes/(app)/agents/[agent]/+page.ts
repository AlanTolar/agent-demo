import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getAgent, getListingsOfAgent } from '$lib/utils/cmsDataHandler';

export const load = (({ params }) => {
	const agent = getAgent(params.agent).default;
	const listings = getListingsOfAgent(params.agent);
	if (agent) {
		return {
			agent,
			listings,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;

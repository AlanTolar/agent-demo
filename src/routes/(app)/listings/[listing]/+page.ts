import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getListing, getAgent } from '$lib/utils/cmsDataHandler';

export const load = (({ params }) => {
	const listing = getListing(params.listing);
	const agent = getAgent(listing.agent);
	if (listing) {
		return {
			listing,
			agent,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;

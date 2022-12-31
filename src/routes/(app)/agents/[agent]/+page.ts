import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getAgent } from '$lib/utils/listings';

export const load = (({ params }) => {
	const agent = getAgent(params.agent).default;
	if (agent) {
		return {
			agent,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;

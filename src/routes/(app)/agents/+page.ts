import type { PageLoad } from './$types';
import { getAgents } from '$lib/utils/listings';

export const load = (({ params }) => {
	return {
		agents: getAgents(),
	};
}) satisfies PageLoad;

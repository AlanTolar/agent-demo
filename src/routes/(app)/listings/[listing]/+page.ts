import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getListing } from '$lib/utils/listings';

export const load = (({ params }) => {
	const listing = getListing(params.listing);
	if (listing) {
		return {
			listing,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;

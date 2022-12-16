import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
    const modules = import.meta.glob('$lib/content/listings/*.json', { eager: true });
	const listing = modules[`/src/lib/content/listings/${params.listing}.json`];
    if (listing) {
        return {
            listing
        };
    }
 
  throw error(404, 'Not found');
}) satisfies PageLoad;
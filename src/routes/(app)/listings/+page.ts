import type { PageLoad } from './$types';
import { getListings } from '$lib/scripts/listings';

 
export const load = (({ params }) => {
    return {
        listings: getListings()
    };
}) satisfies PageLoad;
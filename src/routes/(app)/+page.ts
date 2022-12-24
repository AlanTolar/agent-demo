import type { PageLoad } from './$types';
import { getListings } from '$lib/utils/listings';
 
export const load = (({ params }) => {
    return {
        listings: getListings()
    };
}) satisfies PageLoad;
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types'

// the same as
type OutputProps = {
    title: string,
}

export const load: PageLoad<OutputProps> = async ({ params }) => {

    const title = params.listing
    // search for property

    return { title };

    throw error(404, 'Not found');
}
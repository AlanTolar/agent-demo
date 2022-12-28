export function getListings(num = 100) {
	const modules = import.meta.glob('/src/lib/content/listings/*.json', { eager: true });
	let listings = Object.keys(modules).map((key) => {
		const filename = key.split('/').at(-1)?.split('.').at(0);
		const url = `/listings/${filename}`;
		return { ...modules[key], json_url: key, url };
	});
	listings.sort((a, b) => (a.date > b.date ? -1 : b.date > a.date ? 1 : 0));
	return listings.slice(0, num);
}

export function getListing(listingName: string) {
	const modules = import.meta.glob('/src/lib/content/listings/*.json', { eager: true });
	const listing = modules[`/src/lib/content/listings/${listingName}.json`];
	return listing;
}
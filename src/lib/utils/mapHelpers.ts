// function that filters listings to get the bounding box from the coordinates in the location key

export function getBbox(coords: [number, number][]): [number, number][] {
	const lngs = coords.map((coord) => coord[0]);
	const lats = coords.map((coord) => coord[1]);
	const minLng = Math.min(...lngs);
	const maxLng = Math.max(...lngs);
	const minLat = Math.min(...lats);
	const maxLat = Math.max(...lats);
	return [
		[minLng, minLat],
		[maxLng, maxLat],
	];
}

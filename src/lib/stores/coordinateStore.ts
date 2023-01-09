import { writable } from 'svelte/store';

interface Coordinate {
	lat: number;
	lng: number;
}

interface BoundingBox {
	north: number;
	east: number;
	south: number;
	west: number;
}

// class CoordinateStore {
// 	private coordinates: Coordinate[] = [];
// 	public store = writable<Coordinate[]>([]);

// 	constructor(coordinates: Coordinate[]) {
// 		this.coordinates = coordinates;
// 		this.store.set(coordinates);
// 	}

// 	addCoordinate(coordinate: Coordinate) {
// 		this.coordinates.push(coordinate);
// 		this.store.set(this.coordinates);
// 	}

// 	removeCoordinate(coordinate: Coordinate) {
// 		this.coordinates = this.coordinates.filter(
// 			(c) => c.lat !== coordinate.lat && c.lng !== coordinate.lng,
// 		);
// 		this.store.set(this.coordinates);
// 	}

// 	addCoordinates(coordinates: number[][]) {
// 		for (const coord of coordinates) {
// 			this.addCoordinate({ lat: coord[0], lng: coord[1] });
// 		}
// 	}

// 	get boundingBox(): BoundingBox {
// 		if (!this.coordinates.length) {
// 			return {
// 				north: 0,
// 				east: 0,
// 				south: 0,
// 				west: 0,
// 			};
// 		}

// 		let north = -Infinity;
// 		let east = -Infinity;
// 		let south = Infinity;
// 		let west = Infinity;

// 		for (const coord of this.coordinates) {
// 			north = Math.max(north, coord.lat);
// 			east = Math.max(east, coord.lng);
// 			south = Math.min(south, coord.lat);
// 			west = Math.min(west, coord.lng);
// 		}

// 		return { north, east, south, west };
// 	}
// }

// const coordinateStore = new CoordinateStore([]);

// export default coordinateStore;

// import { writable } from 'svelte/store';

import type { Listing } from '$lib/types/Listing';

export function listingsStore(listings: Listing[]) {
	const { subscribe, set, update } = writable(listings);

	return {
		subscribe,
		reset: () => set([]),
		filterListings: (
			minPriceValue: number,
			maxPriceValue: number,
			minAcresSlider: number,
			maxAcresSlider: number,
		) => {
			listings = listings.map((listing) => {
				const price = listing.price;
				const acres = listing.acres;
				const inPriceRange =
					(price >= minPriceValue || minPriceValue == minPrice) &&
					(price <= maxPriceValue || maxPriceValue == maxPrice);
				const inAcresRange =
					(acres >= minAcresSlider || minAcresSlider == minAcres) &&
					(acres <= maxAcresSlider || maxAcresSlider == maxAcres);
				listing.visible = inPriceRange && inAcresRange;
				return listing;
			});
		},
	};
	1;
}

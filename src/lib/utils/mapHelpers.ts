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

import mapboxgl from 'mapbox-gl';

export function createBoundingBox(coordinates: number[][], map: mapboxgl.Map) {
	if (coordinates.length <= 1) {
		// map.zoomTo(15, { duration: 2000 });
		map.dragPan.disable();
		map.scrollZoom.disable();
		const coord: [number, number] = [coordinates[0][0], coordinates[0][1]];
		map.flyTo({
			center: coord, // destination coordinates
			zoom: 10,
			essential: true,
		});
		map.once('moveend', () => {
			// function to be run after flyto is finished
			map.dragPan.enable();
			map.scrollZoom.enable();
		});
		return;
	}

	const bounds = new mapboxgl.LngLatBounds();
	for (const coord of coordinates) {
		bounds.extend([coord[0], coord[1]]);
	}

	const coordsList = bounds.toArray().flat();

	map.fitBounds(coordsList, { padding: 20 });
	return bounds;
}

export function addPropertyBoundary(coordinates: number[][], map: mapboxgl.Map) {
	if (coordinates.length <= 1) {
		const coord: [number, number] = [coordinates[0][0], coordinates[0][1]];
		new mapboxgl.Marker().setLngLat(coord).addTo(map);
		return;
	}
	map.addLayer({
		id: 'property-boundary',
		type: 'line',
		source: {
			type: 'geojson',
			data: {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates,
				},
			},
		},
		layout: {
			'line-join': 'round',
			'line-cap': 'round',
		},
		paint: {
			'line-color': '#888',
			'line-width': 4,
		},
	});
}

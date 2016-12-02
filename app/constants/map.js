export const MAP_INITIAL_ZOOM = 2;
export const MAP_MIN_ZOOM = 2;
export const MAP_CENTER = [23.738492, 27.113969];
export const MAP_MAX_BOUNDS = [
  [82.685014, -171.843425],
  [-65.990152, 176.027656]
];

// Basemap
export const BASEMAP_TILE = 'https://api.mapbox.com/styles/v1/csn/civtok4xx004d2kpo3acytide/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY3NuIiwiYSI6ImNpdnRvam1qeDAwMXgyenRlZjZiZWc1a2wifQ.Gr5pLJzG-1tucwY4h-rGdA';

// Attributions
export const BASEMAP_ATTRIBUTION_MAPBOX = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>';
export const BASEMAP_ATTRIBUTION_CARTO = 'CARTO <a href="https://carto.com/attributions" target="_blank">attribution</a>';

// Map's endpoints
export const ENDPOINT_TILES = `https://${process.env.CARTODB_ACCOUNT}.carto.com/api/v1/map/`;
export const ENDPOINT_SQL = `https://${process.env.CARTODB_ACCOUNT}.carto.com/api/v2/sql?q=`;

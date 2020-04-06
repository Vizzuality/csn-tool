export const MAP_INITIAL_ZOOM = 2;
export const MAP_MIN_ZOOM = 2;
export const MAP_CENTER = [23.738492, 27.113969];
export const MAP_MAX_BOUNDS = [
  [82.685014, -171.843425],
  [-65.990152, 176.027656]
];

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY3NuIiwiYSI6ImNpdnRvam1qeDAwMXgyenRlZjZiZWc1a2wifQ.Gr5pLJzG-1tucwY4h-rGdA';
export const BASEMAP_MAP = 'map';
export const BASEMAP_SATELLITE = 'satellite';
export const BASEMAP_TILE_MAP = `https://api.mapbox.com/styles/v1/csn/civtok4xx004d2kpo3acytide/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`;
export const BASEMAP_TILE_SATELLITE = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`;

// Attributions
export const BASEMAP_ATTRIBUTION_MAPBOX = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>';
export const BASEMAP_ATTRIBUTION_CARTO = 'CARTO <a href="https://carto.com/attributions" target="_blank">attribution</a>';

export const HYDROLOGY_LAYERS = {
  freshwaterFlowPresent: `https://api.mapbox.com/v4/wetlands.arrcb8z1/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`,
  freshwaterFlow2050: `https://api.mapbox.com/v4/wetlands.2i0qvaog/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`,
  inundationPresent: `https://api.mapbox.com/v4/wetlands.2s8xqsrd/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`,
  inundation2050: `https://api.mapbox.com/v4/wetlands.5o3mho9f/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`
};

// Map's endpoints
export const ENDPOINT_SQL = `https://${process.env.CARTODB_ACCOUNT}.carto.com/api/v2/sql?q=`;

// Population boundaries colors
export const BOUNDARY_COLORS = [
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
  '#ffff99'
];

// aewa styles
export const SELECTED_AEWA_STYLE = {
  opacity: 0.5,
  weight: 0,
  dashArray: [1, 7],
  lineCap: 'round',
  color: 'white',
  fill: true,
  fillOpacity: 0.5,
  fillColor: '#FCF0C5'
};


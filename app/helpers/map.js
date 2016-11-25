import { ENDPOINT_TILES } from 'constants/map';

// Layer spec
const MAP_LAYER_SPEC = {
  layers: [{
    user_name: process.env.CARTODB_ACCOUNT,
    type: 'cartodb',
    options: {
      sql: '',
      cartocss: '',
      cartocss_version: '2.3.0'
    }
  }]
};

function getLayerSpec(layerData) {
  const spec = Object.assign({}, MAP_LAYER_SPEC);
  const layerOptions = spec.layers[0].options;

  layerOptions.sql = layerData.sql;
  layerOptions.cartocss = layerData.cartocss;

  return JSON.stringify(spec);
}

export function createLayer(layerData, callback) {
  const layer = getLayerSpec(layerData);

  return fetch(ENDPOINT_TILES, {
    method: 'POST',
    body: layer,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }).then(response => response.json())
  .then(res => {
    callback(`${ENDPOINT_TILES}${res.layergroupid}/{z}/{x}/{y}@2x.png32`);
  });
}

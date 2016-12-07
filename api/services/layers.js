const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function serialize(layers) {
  return layers.map((item) => ({
    name: item.name,
    layerOrder: item.layer_order,
    zIndex: item.z_index,
    buckets: JSON.parse(item.buckets),
    legendData: JSON.parse(item.legend_data),
    data: {},
    slug: item.slug,
    category: item.category,
    type: item.type,
    query: item.query,
    cartoCss: item.carto_css,
    legendQuery: item.legend_query,
    active: item.active
  }));
}

function getData(layer, id) {
  return new Promise((resolve, reject) => {
    const newLayer = layer;
    const promises = [];
    if (layer.legendQuery) {
      const legendQuery = layer.legendQuery.replace(new RegExp('(\\${id})', 'g'), id);
      promises.push(rp(encodeURI(CARTO_SQL + legendQuery)));
    }
    if (layer.query) {
      const query = layer.query.replace(new RegExp('(\\${id})', 'g'), id);
      promises.push(rp(encodeURI(CARTO_SQL + query)));
    }

    if (promises.length) {
      Promise.all(promises)
        .then(values => {
          const legendData = JSON.parse(values[0]).rows || [];
          if (legendData && legendData.length) {
            newLayer.legendData = legendData;
          }
          const data = JSON.parse(values[1]).rows || [];
          if (data && data.length) {
            newLayer.data = data;
          }
          resolve(newLayer);
        })
        .catch(err => {
          reject(err);
        });
    } else {
      resolve(newLayer);
    }
  });
}

module.exports = {
  serialize,
  getData
};

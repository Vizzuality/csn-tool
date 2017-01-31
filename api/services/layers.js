const rp = require('request-promise-native');
const CARTO_SQL = require('../constants').CARTO_SQL;

function serialize(layers) {
  return layers.map((item) => ({
    name: item.name,
    layerOrder: item.layer_order,
    zIndex: item.z_index,
    buckets: item.buckets || null,
    legendConfig: item.legendConfig || null,
    legendData: item.legendData || null,
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

function getCartoQuery(query) {
  return rp(encodeURI(CARTO_SQL + query));
}

function getLayerData(layer, id) {
  return new Promise((resolve, reject) => {
    const newLayer = layer;
    const promises = [];
    if (layer.legendQuery) {
      const legendQuery = layer.legendQuery.replace(new RegExp('(\\${id})', 'g'), id);
      promises.push(getCartoQuery(legendQuery));
    }
    if (layer.query) {
      let query = layer.query.replace(new RegExp('(\\${id})', 'g'), id);
      query += layer.type === 'topojson' ? '&format=topojson' : '';
      promises.push(getCartoQuery(query));
    }

    if (promises.length) {
      Promise.all(promises)
        .then(values => {
          const legendData = JSON.parse(values[0]).rows || [];
          if (legendData && legendData.length) {
            newLayer.legendData = legendData;
          }

          const data = layer.type === 'topojson' ? JSON.parse(values[1]) : JSON.parse(values[1]).rows || [];
          if (data) {
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

function getData(layers, id) {
  return new Promise((resolve, reject) => {
    for (let i = 0, layersLength = layers.length; i < layersLength; i++) {
      const promises = [];
      promises.push(getLayerData(layers[i], id));
      Promise.all(promises)
        .then(dataLayers => {
          resolve(dataLayers);
        })
        .catch(err => {
          reject(err);
        });
    }
  });
}

function getLayers(section, id) {
  let sectionQuery = '';
  if (section) {
    sectionQuery = `WHERE section = '${section}'`;
  }
  const query = `SELECT * FROM layer_spec ${sectionQuery}`;

  return new Promise((resolve, reject) => {
    rp(encodeURI(CARTO_SQL + query))
      .then((data) => {
        const results = JSON.parse(data).rows || [];
        if (results && results.length > 0) {
          const parsedLayers = serialize(results);
          getData(parsedLayers, id)
            .then((layers) => {
              resolve(layers);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          reject({
            statusCode: 404,
            message: 'No layers found'
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  getLayers
};

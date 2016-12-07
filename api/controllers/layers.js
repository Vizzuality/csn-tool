const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;
const LayersService = require('../services/layers');

function getLayers(req, res) {
  const query = 'SELECT * FROM layer_spec';

  rp(encodeURI(CARTO_SQL + query))
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        const parsedLayers = LayersService.serialize(results);
        res.json(parsedLayers);
      } else {
        res.status(404);
        res.json({ error: 'No layers found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getLayersSpecies(req, res) {
  const query = 'SELECT * FROM layer_spec';

  rp(encodeURI(CARTO_SQL + query))
    .then((data) => {
      const id = req.params.id;
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        const parsedLayer = LayersService.serialize(results)[0];
        LayersService.getData(parsedLayer, id)
          .then((layer) => {
            res.json(layer);
          })
          .catch(err => {
            res.status(err.statusCode || 500);
            res.json({ error: err.message });
          });
      } else {
        res.status(404);
        res.json({ error: 'No species layers found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

module.exports = {
  getLayers,
  getLayersSpecies
};

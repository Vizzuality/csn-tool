const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;
const LayersService = require('../services/layers');

function getLayers(req, res) {
  let sectionQuery = '';
  if (req.query.section) {
    sectionQuery = `WHERE section = '${req.query.section}'`;
  }
  const query = `SELECT * FROM layer_spec ${sectionQuery}`;

  rp(encodeURI(CARTO_SQL + query))
    .then((data) => {
      const id = req.params.id;
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        const parsedLayers = LayersService.serialize(results);
        LayersService.getData(parsedLayers, id)
          .then((layers) => {
            res.json(layers);
          })
          .catch(err => {
            res.status(err.statusCode || 500);
            res.json({ error: err.message });
          });
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

module.exports = {
  getLayers
};

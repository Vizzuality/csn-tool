const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSpecies(req, res) {
  rp(`${CARTO_SQL}q=SELECT * FROM species`)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404);
        res.json({ error:'No species' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error:err.message });
    });
}

module.exports = {
  getSpecies
};

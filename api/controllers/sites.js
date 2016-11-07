const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSites(req, res) {
  const query = 'SELECT * FROM sites LIMIT 50';
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404);
        res.json({ error: 'No sites' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

module.exports = {
  getSites
};

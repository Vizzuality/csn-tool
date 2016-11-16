const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getCountries(req, res) {
  const query = 'SELECT * FROM countries';
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404);
        res.json({ error: 'No countries' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getCountry(req, res) {
  const query = `SELECT c.country, c.iso3, si.hyperlink, si.protection_status, si.site_name, si.lat, si.lon, si.site_id
    FROM countries c
    INNER JOIN sites si ON si.country_id = c.country_id
    WHERE c.iso3='${req.params.iso}'`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404);
        res.json({ error: 'No country found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

module.exports = {
  getCountries,
  getCountry
};

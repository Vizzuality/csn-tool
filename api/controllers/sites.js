const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSites(req, res) {
  const query = 'with p as (SELECT DISTINCT site_id FROM species_sites) SELECT * FROM sites WHERE site_id in (SELECT * from p) LIMIT 100';
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

function getSitesDetail(req, res) {
  const query = `SELECT s.*, ss.csn_criteria, ss.iba_criteria, ss.season, si.lat, si.lon, si.site_name
    FROM species s
    INNER JOIN species_sites ss ON ss.species_id = s.species_id
    INNER JOIN sites si ON si.site_id = ss.site_id AND si.slug = '${req.params.slug}'`;
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
  getSites,
  getSitesDetail
};

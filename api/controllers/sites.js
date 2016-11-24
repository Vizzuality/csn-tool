const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSites(req, res) {
  const query = `with stc as (select site_id, SUM(case when csn_criteria = '' then 0 else 1 end) as csn, SUM(case when iba_criteria = '' then 0 else 1 end) as iba  from species_sites group by site_id),
      p as (SELECT DISTINCT site_id FROM species_sites)
    SELECT s.country, s.site_name, s.protection_status, s.slug, s.lat, s.lon, stc.csn, stc.iba
    FROM sites s
    INNER JOIN stc ON stc.site_id = s.site_id
    WHERE s.site_id in (SELECT * from p)
    ORDER BY s.country
    LIMIT 400`;
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
  const query = `SELECT s.scientific_name, s.english_name, string_agg(p.populations, ', ') as population,
      ss.csn_criteria, ss.iba_criteria, ss.season, si.lat, si.lon, si.site_name
    FROM species s
    INNER JOIN species_sites ss ON ss.species_id = s.species_id
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    INNER JOIN sites si ON si.site_id = ss.site_id AND si.slug = '${req.params.slug}'
    GROUP BY s.scientific_name, s.english_name, ss.csn_criteria, ss.iba_criteria, ss.season, si.lat, si.lon, si.site_name, 1
    ORDER BY s.english_name`;
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

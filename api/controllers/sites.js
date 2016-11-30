const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSites(req, res) {
  const query = `with stc as (select site_id, SUM(case when csn_criteria = ''
    then 0 else 1 end) as csn, SUM(case when iba_criteria = '' then 0 else 1
      end) as iba  from species_sites group by site_id),
      p as (SELECT DISTINCT site_id FROM species_sites)
    SELECT s.country, s.site_name, s.protection_status, s.site_id as id, s.lat, s.lon,
    stc.csn, stc.iba
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

function getSitesLocations(req, res) {
  const query = 'SELECT s.site_name, s.site_id as id, s.lat, s.lon FROM sites s';
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

function getSitesSpecies(req, res) {
  const query = `WITH my_sites AS (
      SELECT DISTINCT the_geom_webmercator, site_id, lat, lon, site_name
      FROM sites
      WHERE site_id = ${req.params.id}
    )
    SELECT s.scientific_name, s.english_name, s.species_id as id, string_agg(flyway.populationname, ', ') as population,
      ss.season, ss.csn_criteria, ss.iba_criteria, my_sites.lat, my_sites.lon, my_sites.site_name
    FROM species s
    INNER JOIN species_and_flywaygroups AS flyway
    ON flyway.ssid = s.species_id
    INNER JOIN species_sites AS ss ON ss.species_id = s.species_id AND ss.site_id IN (SELECT site_id FROM my_sites)
    INNER JOIN my_sites ON ST_CONTAINS(flyway.the_geom_webmercator, my_sites.the_geom_webmercator)
    GROUP BY s.scientific_name, s.english_name, s.species_id, ss.season, ss.csn_criteria, ss.iba_criteria, my_sites.lat, my_sites.lon, my_sites.site_name
    ORDER BY s.scientific_name`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json({
          site: [{
            lat: result.rows[0].lat,
            lon: result.rows[0].lon,
            site_name: result.rows[0].site_name
          }],
          data: result.rows
        });
      } else {
        res.status(404);
        res.json({ site: [], data: [], error: 'No sites' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSiteThreats(req, res) {
  const query = `SELECT s.lat, s.lon, s.site_name, p.threat_name
    FROM sites s
    INNER JOIN sites_threats p on p.site_id = s.site_id
    WHERE s.site_id = ${req.params.id}`;

  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        res.json({
          site: [{
            lat: results[0].lat,
            lon: results[0].lon,
            site_name: results[0].site_name
          }],
          data: results.map((item) => ({ threat_name: item.threat_name }))
        });
      } else {
        res.status(404);
        res.json({ site: [], data: [], error: 'There are no threats for this site' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

module.exports = {
  getSites,
  getSitesLocations,
  getSitesSpecies,
  getSiteThreats
};

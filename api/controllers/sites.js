const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

const NUM_RESULTS_PER_PAGE = 200;

function getSites(req, res) {
  const query = `with stc as (
        select site_id, SUM(case when csn_criteria = ''
        then 0 else 1 end) as csn, SUM(case when iba_criteria = '' then 0 else 1
        end) as iba  from species_sites group by site_id
      ),
      p as (SELECT DISTINCT site_id FROM species_sites)
    SELECT s.country, s.iso3, s.iso2, s.site_name, s.protection_status, s.site_id as id, s.lat, s.lon,
    stc.csn, stc.iba, s.hyperlink
    FROM sites s
    INNER JOIN stc ON stc.site_id = s.site_id
    WHERE s.site_id in (SELECT * from p)
    ORDER BY s.country`;
  rp(`${CARTO_SQL}${query}&rows_per_page=${NUM_RESULTS_PER_PAGE}&page=${req.query.page}`)
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

function getSitesDetails(req, res) {
  const query = `SELECT site_id AS id, protection_status,
    iso3 as country, site_name, lat, lon,
    hyperlink, csn, iba
    FROM sites
    WHERE site_id = ${req.params.id}`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        const row = results[0];
        res.json({
          site: [{
            name: row.site_name,
            id: row.id,
            country: row.country,
            protection_status: row.protection_status,
            lat: row.lat,
            lon: row.lon,
            hyperlink: row.hyperlink,
            csn: row.csn,
            iba: row.iba
          }]
        });
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
  const query = `SELECT s.scientific_name, s.english_name, s.species_id AS id,
    s.iucn_category, si.lat, si.lon, si.site_name, s.hyperlink,
    ss._end AS end, ss.start, ss.minimum, ss.maximum, ss.season,
    ss.units, ss.iba_criteria, ss.csn_criteria
    FROM species AS s
    INNER JOIN species_sites AS ss ON ss.species_id = s.species_id
    INNER JOIN sites AS si ON si.site_id = ss.site_id
    WHERE si.site_id = ${req.params.id}
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

function getSitesPopulations(req, res) {
  const query = `WITH my_sites AS (
      SELECT DISTINCT the_geom_webmercator, site_id, lat, lon, site_name
      FROM sites
      WHERE site_id = ${req.params.id}
    )
    SELECT s.scientific_name, s.english_name, s.species_id AS id,
    my_sites.lat, my_sites.lon, my_sites.site_name, s.hyperlink,
    dd.a, dd.b, dd.c, dd.table_1_status,
    dd.populations,
    'http://wpe.wetlands.org/view/' || dd.wpepopid AS pop_hyperlink
    FROM species AS s
    INNER JOIN species_and_flywaygroups AS flyway
    ON flyway.ssid = s.species_id
    INNER JOIN my_sites ON ST_CONTAINS(flyway.the_geom_webmercator,
                                       my_sites.the_geom_webmercator)
    INNER JOIN populations_species_no_geo AS dd ON
    dd.wpepopid = flyway.wpepopid
    ORDER BY s.scientific_name
    LIMIT 400`;
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
        res.json({ site: [], data: [], error: 'No populations for site' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSitesHabitats(req, res) {
  const query = `SELECT s.lat, s.lon, s.site_name, p.habitat_name
    FROM sites s
    INNER JOIN sites_habitats p on p.site_id = s.site_id
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
          data: results.map((item) => ({ habitat_name: item.habitat_name }))
        });
      } else {
        res.status(404);
        res.json({ site: [], data: [], error: 'There are no habitats for this site' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSitesThreats(req, res) {
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
  getSitesDetails,
  getSitesLocations,
  getSitesSpecies,
  getSitesPopulations,
  getSitesHabitats,
  getSitesThreats
};

const { runQuery } = require('../helpers');

const RESULTS_PER_PAGE = 200;

function getSites(req, res) {
  const table = req.query.filter === 'iba' ? 'sites_iba' : 'sites_critical';
  const results = req.query.results || RESULTS_PER_PAGE;
  const search = req.query.search
    ? `${req.query.filter === 'iba' ? 'AND' : 'WHERE'} UPPER(s.country) like UPPER('%${req.query.search}%')
      OR UPPER(s.site_name) like UPPER('%${req.query.search}%')
      OR UPPER(s.protection_status) like UPPER('%${req.query.search}%')
      OR UPPER(s.csn) like UPPER('%${req.query.search}%')
      OR UPPER(s.iba) like UPPER('%${req.query.search}%')`
    : '';

  let query;
  if (req.query.filter === 'iba') {
    query = `WITH stc AS (
        SELECT
          site_id,
          SUM(CASE WHEN iba_criteria = '' THEN 0 ELSE 1 END) as iba
        FROM species_sites_iba GROUP BY site_id
      ),
      p as (SELECT DISTINCT site_id FROM species_sites)
      SELECT
        s.country,
        s.iso3,
        s.iso2,
        s.site_name,
        s.protection_status AS protected,
        s.site_id as id,
        s.lat,
        s.lon,
        coalesce(stc.iba, 0) AS iba_species,
        s.hyperlink,
        coalesce(s.iba_in_danger, false) as iba_in_danger,
        'iba' AS type
      FROM ${table} s
      LEFT JOIN stc ON stc.site_id = s.site_id
      WHERE s.site_id IN (SELECT * from p) ${search}
      ORDER BY s.country ASC, s.site_name ASC`;
  } else {
    query = `WITH stc AS (
      SELECT site_id, COUNT(*) csn
      FROM species_sites
      GROUP BY site_id
    )
    SELECT
      s.country,
      s.site_name_clean AS csn_name,
      protected,
      s.site_name_clean AS site_name,
      s.lat,
      s.lon,
      s.site_id AS id,
      stc.csn,
      s.iso3,
      s.iso2,
      total_percentage,
      'csn' AS type
    FROM ${table} s
    LEFT JOIN stc ON stc.site_id = s.site_id
    ${search}
    ORDER BY s.country ASC, s.site_name ASC`;
  }

  runQuery(query, {
    rows_per_page: results,
    page: req.query.page
  })
    .then((data) => {
      const result = JSON.parse(data);
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSitesDetails(req, res) {
  let query;

  if (req.params.type === 'iba') {
    query = `SELECT
      s.site_id AS id,
      protection_status AS protected,
      s.iso3 as country,
      s.site_name,
      s.lat,
      s.lon,
      s.hyperlink,
      s.csn,
      s.iba,
      COUNT(ss.species_id) AS qualifying_species,
      s.iba_in_danger,
      'iba' AS type
    FROM sites_iba s
    LEFT JOIN species_sites_iba AS ss ON ss.site_id = s.site_id
    WHERE s.site_id = ${req.params.id}
    GROUP BY s.site_id, s.protection_status, s.iso3, s.site_name, s.lat, s.lon,
    s.hyperlink, s.csn, s.iba, s.iba_in_danger`;
  } else {
    query = `SELECT
      s.site_id AS id,
      s.protected,
      s.iso3 AS country,
      site_name_clean AS site_name,
      lat,
      lon,
      COUNT(ss.species_rec_id) AS qualifying_species,
      'csn' AS type
    FROM sites_critical AS s
    LEFT JOIN species_sites_critical AS ss ON ss.site_id = s.site_id
    WHERE s.site_id = ${req.params.id}
    GROUP BY s.site_id, s.protected, iso3, lat, lon, s.site_name_clean`;
  }

  runQuery(query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];

      if (results && results.length > 0) {
        const row = results[0];
        res.json({
          site: [{
            name: row.site_name,
            id: row.id,
            country: row.country,
            protected: row.protected,
            lat: row.lat,
            lon: row.lon,
            hyperlink: row.hyperlink,
            csn: row.csn,
            iba: row.iba,
            iba_in_danger: row.iba_in_danger,
            qualifying_species: row.qualifying_species,
            type: row.type
          }]
        });
      } else {
        res.status(404);
        res.json({ error: 'Site Not Found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSitesLocations(req, res) {
  let query;
  if (req.params.type === 'csn') {
    query = `SELECT s.site_name_clean AS site_name, s.site_id as id, s.lat, s.lon,
    'csn' AS site_type  FROM sites_critical s`;
  } else {
    query = `SELECT s.site_name, s.site_id as id, s.lat, s.lon,
      'iba' AS site_type FROM sites_iba s`;
  }

  runQuery(query)
    .then((data) => {
      const result = JSON.parse(data);
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSitesSpecies(req, res) {
  let query;

  if (req.params.type === 'iba') {
    query = `SELECT
      s.scientific_name,
      s.english_name,
      s.french_name,
      s.species_id AS id,
      s.iucn_category,
      si.lat,
      si.lon,
      si.site_name,
      s.hyperlink,
      ss._end AS end,
      ss.start,
      ss.minimum,
      ss.maximum,
      ss.season,
      ss.units,
      ss.iba_criteria,
      ss.geometric_mean
    FROM species AS s
    INNER JOIN species_sites_iba AS ss ON ss.species_id = s.species_id
    INNER JOIN sites_iba AS si ON si.site_id = ss.site_id
    WHERE si.site_id = ${req.params.id}
    ORDER BY s.taxonomic_sequence`;
  } else {
    query = `SELECT
      s.species_id AS id,
      ss.popmax as maximum,
      ss.popmin as minimum,
      ss.season,
      ss.units,
      ss.yearstart AS start,
      ss.yearend AS end,
      ss.percentfly,
      si.site_name_clean AS csn_site_name,
      si.lat,
      si.lon,
      si.country,
      si.iso2,
      si.protected,
      p.population_name AS population,
      s.iucn_category,
      s.english_name,
      s.french_name,
      s.scientific_name,
      si.site_name_clean AS site_name,
      s.hyperlink, ss.geometric_mean,
      ss.csn1::boolean,
      ss.csn2::boolean
    FROM sites_critical AS si
    INNER JOIN species_sites_critical ss ON ss.site_id = si.site_id
    INNER JOIN populations p on p.wpepopid = ss.wpepopid
    INNER JOIN species s ON s.species_id = p.species_main_id
    WHERE si.site_id = '${req.params.id}'
    ORDER BY s.taxonomic_sequence`;
  }

  runQuery(query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      res.json(results);
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
  getSitesSpecies
};

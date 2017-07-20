const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;
const normalizeSiteStatus = require('../helpers/index').normalizeSiteStatus;

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

function getCountryDetails(req, res) {
  const query = `SELECT * FROM countries WHERE iso3='${req.params.iso}'`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows[0]);
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

function getCountrySites(req, res) {
  const query = `with stc as (select site_id,
      SUM(case when iba_criteria = '' then 0 else 1 end) as iba
        from species_sites group by site_id)
    SELECT c.country, c.iso3,
      s.protection_status AS protected, s.site_name, s.lat, s.lon,
      s.site_id as id, stc.iba AS iba_species, s.hyperlink, s.iba_in_danger
    FROM sites s
  	INNER JOIN countries c ON s.country_id = c.country_id AND
    c.iso3 = '${req.params.iso}'
    LEFT JOIN stc ON stc.site_id = s.site_id
    ORDER BY s.site_name`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        results.map((item) => {
          const site = item;
          site.protected_slug = normalizeSiteStatus(item.protected);
          return site;
        });
        res.json(results);
      } else {
        res.status(404);
        res.json({ error: 'No sites found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getCountryCriticalSites(req, res) {
  const query = `
    SELECT s.site_name_clean AS csn_name, protected,
    s.site_id AS id, 0 AS csn_species, total_percentage
    FROM sites_csn_points s
    WHERE s.iso3 = '${req.params.iso}'
    ORDER BY s.site_name ASC`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        results.map((item) => {
          const site = item;
          site.protected_slug = normalizeSiteStatus(item.protected);
          return site;
        });
        res.json(results);
      } else {
        res.status(404);
        res.json({ error: 'No sites found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getCountrySpecies(req, res) {
  const query = `SELECT s.scientific_name, s.english_name, s.genus, s.family,
    s.species_id as id, string_agg(p.population_name, ', ') as populations, s.hyperlink,
    sc.country_status, s.iucn_category, sc.occurrence_status
    FROM species_main s
    INNER JOIN species_country sc on sc.species_id = s.species_id
    INNER JOIN countries c on c.country_id = sc.country_id AND
      c.iso3 = '${req.params.iso}'
    INNER JOIN populations_iba p on p.species_main_id = s.species_id
    GROUP BY s.scientific_name, s.english_name, s.genus, s.family, s.species_id, 1,
    s.hyperlink, sc.country_status, s.iucn_category, s.taxonomic_sequence,
    sc.occurrence_status
    ORDER BY s.taxonomic_sequence`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404);
        res.json({ error: 'No species found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}
function getCountryPopulations(req, res) {
  const query = `SELECT
    s.scientific_name,
    s.english_name,
    s.iucn_category,
    pi.wpepopid AS pop_id,
    s.species_id AS id,
    'http://wpe.wetlands.org/view/' || pi.wpepopid AS pop_hyperlink,
    pi.caf_action_plan, pi.eu_birds_directive,
    pi.a, pi.b, pi.c, pi.flyway_range,
    pi.year_start, pi.year_end,
    pi.size_min, pi.size_max,
    pi.population_name AS population,
    pi.ramsar_criterion_6 AS ramsar_criterion
    FROM populations_iba AS pi
    INNER JOIN species_country AS c ON c.iso = '${req.params.iso}' AND
    c.species_id = pi.species_main_id AND c.country_status != 'Vagrant'
    INNER JOIN species_main AS s ON s.species_id = pi.species_main_id
    WHERE (
      ST_Intersects(pi.the_geom,(SELECT the_geom FROM world_borders WHERE iso3 = '${req.params.iso}'))
    )
    ORDER BY s.taxonomic_sequence
  `;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404);
        res.json({ error: 'No species found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getCountryPopsWithLookAlikeCounts(req, res) {
  const query = `SELECT sq.scientific_name AS original_species,
    sq.english_name,
    sq.population_name AS population, sq.a AS original_a,
    sq.b AS original_b, sq.c AS original_c, sq.wpepopid AS pop_id_origin,
    COUNT(*) AS confusion_species,
    COUNT(case when pi.a IS NOT NULL
          AND pi.a != '' then pi.population_name end) AS confusion_species_as
    FROM
    (
      SELECT confusion_group,
      sm.species_id, sm.scientific_name,
      sm.english_name, pi.the_geom, pi.population_name,
      pi.a, pi.b, pi.c, pi.wpepopid, sm.taxonomic_sequence
      FROM species_main AS sm
      INNER JOIN species_country AS sc
      ON sc.species_id = sm.species_id
      AND sc.iso = '${req.params.iso}'
      INNER JOIN world_borders AS wb ON
      wb.iso3 = sc.iso
      INNER JOIN populations_iba AS pi
      ON ST_INTERSECTS(pi.the_geom, wb.the_geom)
      AND pi.species_main_id = sm.species_id
      WHERE
      sm.confusion_group IS NOT NULL
    ) as sq

    INNER JOIN species_main AS sm ON
    (sq.confusion_group %26%26 sm.confusion_group)
    AND sm.species_id != sq.species_id
    INNER JOIN world_borders AS wb ON
    wb.iso3 = '${req.params.iso}'
    INNER JOIN populations_iba AS pi
    ON ST_INTERSECTS(pi.the_geom, wb.the_geom)
    AND ST_INTERSECTS(pi.the_geom, sq.the_geom)
    AND pi.species_main_id = sm.species_id
    GROUP BY sq.scientific_name,
    sq.english_name, sq.population_name,
    sq.a, sq.b, sq.c, sq.wpepopid, sq.taxonomic_sequence
    ORDER BY sq.taxonomic_sequence ASC`;

  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404);
        res.json({ error: 'No species found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getCountryLookAlikeSpecies(req, res) {
  const query = `SELECT sm.scientific_name AS scientific_name,
    sm.english_name, sm.species_id AS id,
    pi.population_name AS population, pi.a, pi.b, pi.c
    FROM
    (
      SELECT confusion_group,
       sm.species_id, sm.scientific_name,
       sm.taxonomic_sequence,
       pi.the_geom, pi.population_name, pi.a, pi.b, pi.c
       FROM species_main AS sm
       INNER JOIN species_country AS sc
       ON sc.species_id = sm.species_id
       AND sc.iso = '${req.params.iso}'
       INNER JOIN world_borders AS wb ON
       wb.iso3 = sc.iso
       INNER JOIN populations_iba AS pi
       ON ST_INTERSECTS(pi.the_geom, wb.the_geom)
       AND pi.species_main_id = sm.species_id
       AND pi.wpepopid = ${req.params.populationId}
       WHERE sm.confusion_group IS NOT NULL
    ) as sq

    INNER JOIN species_main AS sm ON
    (sq.confusion_group %26%26 sm.confusion_group)
    AND sm.species_id != sq.species_id
    INNER JOIN world_borders AS wb ON
    wb.iso3 = '${req.params.iso}'
    INNER JOIN populations_iba AS pi
    ON ST_INTERSECTS(pi.the_geom, wb.the_geom)
    AND ST_INTERSECTS(pi.the_geom, sq.the_geom)
    AND pi.species_main_id = sm.species_id
    ORDER BY sm.taxonomic_sequence ASC`;

  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404);
        res.json({ error: 'No species found' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

module.exports = {
  getCountries,
  getCountryDetails,
  getCountrySites,
  getCountryCriticalSites,
  getCountrySpecies,
  getCountryPopulations,
  getCountryPopsWithLookAlikeCounts,
  getCountryLookAlikeSpecies
};

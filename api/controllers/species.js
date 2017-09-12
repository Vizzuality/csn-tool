const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;
const normalizeSiteStatus = require('../helpers/index').normalizeSiteStatus;
const mergeNames = require('../helpers/index').mergeNames;

function getSpeciesList(req, res) {
  const query = `SELECT s.scientific_name, s.english_name, s.genus, s.family,
    s.species_id as id, s.hyperlink, s.iucn_category, aewa_annex_2
    FROM species_main s
    ORDER BY s.taxonomic_sequence`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        res.json(results);
      } else {
        res.status(404);
        res.json({ error: 'No species' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSpeciesDetails(req, res) {
  const query = `SELECT s.scientific_name, s.english_name, s.family,
    s.species_id as id, s.iucn_category, s.hyperlink
    FROM species_main s
    WHERE s.species_id = ${req.params.id}
    `;
  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        const row = results[0];
        res.json({
          species: [{
            scientific_name: row.scientific_name,
            english_name: row.english_name,
            family: row.family,
            id: row.id,
            iucn_category: row.iucn_category,
            hyperlink: row.hyperlink
          }]
        });
      } else {
        res.status(404);
        res.json({ error: 'Species details not available.' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSpeciesSites(req, res) {
  const query = `SELECT s.species_id,
      ss.iba_criteria, ss.maximum, ss.minimum,
      ss.season, ss.units, si.site_name, si.lat, si.lon, si.country, si.iso2,
      si.protection_status AS protected,
      string_agg(p.population_name, ', ') as population,
      si.hyperlink, si.site_id AS id, ss.geometric_mean,
      ss.start, ss._end as end
    FROM species_main s
    INNER JOIN species_sites ss ON s.species_id = ss.species_id
    INNER JOIN populations_iba p on p.species_main_id = s.species_id
    INNER JOIN sites si ON ss.site_id = si.site_id
    WHERE s.species_id = '${req.params.id}'
    GROUP BY ss.iba_criteria, ss.maximum, ss.minimum, ss.units,
    ss.season, si.country, si.iso2, si.protection_status ,si.site_name, si.lat, si.lon,
    si.hyperlink, si.site_id, 1, ss.geometric_mean, ss.start, ss._end
    ORDER BY si.site_name`;
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
        res.json({ error: 'No IBA sites for this species' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSpeciesCriticalSites(req, res) {
  const query = `SELECT s.species_id,
      ss.iba_criteria, ss.maximum, ss.minimum, ss.season, ss.units,
      si.site_name_clean, si.lat, si.lon, si.country, si.iso2, si.protected,
      string_agg(p.populations, ', ') as population,
      si.hyperlink, si.site_id AS id, ss.geometric_mean
    FROM species_main s
    INNER JOIN species_sites ss ON s.species_id = ss.species_id
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    INNER JOIN sites_csn_points si ON ss.site_id = si.site_id
    WHERE s.species_id = '${req.params.id}'
    GROUP BY ss.iba_criteria, ss.maximum, ss.minimum, ss.units,
    ss.season, si.country, si.iso2, si.protected, si.site_name, si.lat, si.lon,
    si.hyperlink, si.site_id, 1, ss.geometric_mean
    ORDER BY si.site_name`;

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
        res.json({ error: 'No species' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSpeciesPopulation(req, res) {
  const query = `SELECT p.population_name AS population, p.a, p.b, p.c,
    s.iucn_category, p.caf_action_plan, p.eu_birds_directive,
    table_1_status,
    p.species, p.wpepopid, p.flyway_range, p.year_start, p.year_end, p.size_min,
    p.size_max, p.ramsar_criterion_6 AS ramsar_criterion,
    'http://wpe.wetlands.org/view/' || p.wpepopid AS pop_hyperlink
    FROM species_main s
    INNER JOIN populations_iba p on p.species_main_id = s.species_id
    WHERE s.species_id = '${req.params.id}'
    ORDER BY p.population_name`;

  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        res.json(results);
      } else {
        res.status(404);
        res.json({ error: 'There are no populations for this Species' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSpeciesLookAlikeSpecies(req, res) {
  const query = `SELECT sq.scientific_name AS original_species,
    sq.species_id, sq.english_name,
    sq.population_name AS population, sq.a AS original_a,
    sq.b AS original_b, sq.c AS original_c, sq.wpepopid AS pop_id_origin,
    COUNT(*) AS confusion_species,
    COUNT(case when pi.a IS NOT NULL
          AND pi.a != '' then pi.population_name end) AS confusion_species_as
    FROM
    (
      SELECT confusion_group,
      sm.species_id, sm.scientific_name,
      sm.english_name, pi.the_geom,
      pi.population_name, pi.a, pi.b, pi.c, pi.wpepopid
      FROM species_main AS sm
      INNER JOIN populations_iba AS pi
      ON pi.species_main_id = sm.species_id
      WHERE sm.species_id = ${req.params.id}
      AND sm.confusion_group IS NOT NULL
    ) as sq

    INNER JOIN species_main AS sm ON
    (sq.confusion_group %26%26 sm.confusion_group)
    AND sm.species_id != sq.species_id
    INNER JOIN populations_iba AS pi
    ON pi.species_main_id = sm.species_id
    AND ST_INTERSECTS(sq.the_geom, pi.the_geom)
    GROUP BY sq.scientific_name,
    sq.english_name, sq.population_name,
    sq.a, sq.b, sq.c, sq.wpepopid, sq.species_id
    ORDER BY sq.population_name ASC`;

  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        const params = [
          { columnName: 'confusion_name', field1: 'confusion_species', field2: 'english_name' }
        ];
        const dataParsed = mergeNames(results, params);
        res.json(dataParsed);
      } else {
        res.status(404);
        res.json({ error: 'There are no confusion populations for this Species' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getPopulationsLookAlikeSpecies(req, res) {
  const query = `SELECT sm.scientific_name AS scientific_name, sm.english_name,
    pi.population_name AS population, pi.a, pi.b, pi.c, sm.species_id AS id
    FROM ( SELECT confusion_group,
       sm.species_id, sm.scientific_name,
       pi.the_geom, pi.population_name, pi.a, pi.b, pi.c
       FROM species_main AS sm
       INNER JOIN populations_iba AS pi
       ON pi.species_main_id = sm.species_id
       WHERE sm.confusion_group IS NOT NULL
       AND pi.wpepopid = ${req.params.populationId}
       AND sm.species_id = ${req.params.id}
    ) as sq
    INNER JOIN species_main AS sm ON
    (sq.confusion_group %26%26 sm.confusion_group)
    AND sm.species_id != sq.species_id
    INNER JOIN populations_iba AS pi ON pi.species_main_id = sm.species_id
    AND ST_INTERSECTS(sq.the_geom, pi.the_geom)
    ORDER BY sm.taxonomic_sequence ASC, pi.population_name ASC`;

  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        const params = [
          { columnName: 'confusion_name', field1: 'confusion_species', field2: 'english_name' }
        ];
        const dataParsed = mergeNames(results, params);
        res.json(dataParsed);
      } else {
        res.status(404);
        res.json({ error: 'There are no habitats for this Species' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

module.exports = {
  getSpeciesList,
  getSpeciesDetails,
  getSpeciesSites,
  getSpeciesCriticalSites,
  getSpeciesPopulation,
  getSpeciesLookAlikeSpecies,
  getPopulationsLookAlikeSpecies
};

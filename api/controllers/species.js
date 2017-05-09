const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;
const normalizeSiteStatus = require('../helpers/index').normalizeSiteStatus;
const mergeNames = require('../helpers/index').mergeNames;

function getSpeciesList(req, res) {
  const query = `SELECT s.scientific_name, s.english_name, s.genus, s.family, s.species_id as id,
      string_agg(p.populations, ', ') as population, s.hyperlink
    FROM species_main s
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    GROUP BY s.scientific_name, s.english_name, s.genus, s.family, s.species_id, 1,
    s.hyperlink, s.taxonomic_sequence
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
      ss.iba_criteria, ss.maximum, ss.minimum, ss.season, ss.units,
      si.site_name, si.lat, si.lon, si.iso2, si.protection_status AS protected,
      string_agg(p.populations, ', ') as population,
      si.hyperlink, si.site_id AS id, ss.geometric_mean
    FROM species_main s
    INNER JOIN species_sites ss ON s.species_id = ss.species_id
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    INNER JOIN sites si ON ss.site_id = si.site_id
    WHERE s.species_id = '${req.params.id}'
    GROUP BY ss.iba_criteria, ss.maximum, ss.minimum, ss.units,
    ss.season, si.iso2, si.protection_status ,si.site_name, si.lat, si.lon,
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

function getSpeciesThreats(req, res) {
  const query = `SELECT p.threat_level_1, p.threat_level_2
    FROM species_main s
    INNER JOIN species_threats p on p.species_id = s.species_id
    WHERE s.species_id = '${req.params.id}'`;

  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        res.json(results);
      } else {
        res.status(404);
        res.json({ error: 'There are no threats for this Species' });
      }
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSpeciesHabitats(req, res) {
  const query = `SELECT p.habitat_level_1, p.habitat_level_2
    FROM species_main s
    INNER JOIN species_habitat p on p.species_id = s.species_id
    WHERE s.species_id = '${req.params.id}'`;

  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        res.json(results);
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

function getSpeciesLookAlikeSpecies(req, res) {
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
      sm.english_name,
       pi.the_geom, pi.population_name, pi.a, pi.b, pi.c,
       pi.wpepopid
      FROM species_main AS sm
      INNER JOIN populations_iba AS pi
      ON pi.species_main_id = sm.species_id
      WHERE
      sm.species_id = ${req.params.id}
      AND
      sm.confusion_group IS NOT NULL
      ORDER BY sm.taxonomic_sequence ASC
    ) as sq

    INNER JOIN species_main AS sm ON
    (sq.confusion_group %26%26 sm.confusion_group)
    AND sm.species_id != sq.species_id
    INNER JOIN populations_iba AS pi
    ON pi.species_main_id = sm.species_id
    GROUP BY sq.scientific_name,
    sq.english_name, sq.population_name,
    sq.a, sq.b, sq.c, sq.wpepopid
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
  const query = `SELECT p.population_name AS population, p.a, p.b, p.c,
    s.iucn_category, p.caf_action_plan, p.eu_birds_directive,
    table_1_status,
    p.species, p.wpepopid, p.flyway_range, p.year_start, p.year_end, p.size_min,
    p.size_max, p.ramsar_criterion_6 AS ramsar_criterion,
    'http://wpe.wetlands.org/view/' || p.wpepopid AS pop_hyperlink
    FROM species_main s
    INNER JOIN populations_iba p on p.species_main_id = s.species_id
    WHERE s.species_id = '${req.params.id}'`;

  rp(encodeURI(CARTO_SQL + query))
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
  getSpeciesPopulation,
  getSpeciesThreats,
  getSpeciesHabitats,
  getSpeciesLookAlikeSpecies,
  getPopulationsLookAlikeSpecies
};

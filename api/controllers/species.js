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
    FROM species s
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
      ss.iba_criteria as iba, ss.maximum, ss.minimum, ss.season,
      si.country, si.site_name, si.lat, si.lon, si.iso2, si.protection_status,
      string_agg(p.populations, ', ') as population,
      si.hyperlink, si.site_id AS id
    FROM species s
    INNER JOIN species_sites ss ON s.species_id = ss.species_id
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    INNER JOIN sites si ON ss.site_id = si.site_id
    WHERE s.species_id = '${req.params.id}'
    GROUP BY ss.iba_criteria, ss.maximum, ss.minimum,
    ss.season, si.country, si.iso2, si.protection_status ,si.site_name, si.lat, si.lon,
    si.hyperlink, si.site_id, 1
    ORDER BY si.site_name`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        results.map((item) => {
          const site = item;
          site.protection_status_slug = normalizeSiteStatus(item.protection_status);
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
  const query = `SELECT p.populations, p.a, p.b, p.c, table_1_status,
    p.species, p.wpepopid, p.flyway_range, p.year_start, p.year_end, p.size_min,
    p.size_max, p.ramsar_criterion,
    'http://wpe.wetlands.org/view/' || p.wpepopid AS pop_hyperlink
    FROM species s
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    WHERE s.species_id = '${req.params.id}'`;

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
    FROM species s
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
    FROM species s
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
  const query = `WITH species_name AS (
    SELECT species_name
      AS confusion_species, confusion_species_group, not_aewa_species
    FROM look_alike_species
    WHERE species_id = ${req.params.id}
    ),

    confusion_species AS (
      SELECT lals.species_id, species_name AS confusion_species,
      lals.confusion_species_group, lals.not_aewa_species, s.english_name,
      s.taxonomic_sequence
      FROM look_alike_species lals
      INNER JOIN species_name sn
      ON sn.confusion_species_group = lals.confusion_species_group
      INNER JOIN species_main s
      ON s.species_id = lals.species_id
      WHERE s.species_id <> ${req.params.id}
    ),

	  original_flyway AS (
      SELECT species_and_flywaygroups.*, populations_species_no_geo.a, populations_species_no_geo.b, populations_species_no_geo.c
      FROM species_and_flywaygroups
      LEFT JOIN populations_species_no_geo
      ON populations_species_no_geo.populations = populationname
        AND populations_species_no_geo.species = species_and_flywaygroups.scientificname
      WHERE ssid = ${req.params.id}
    ),

	  confusion_flyways AS (
      SELECT species_and_flywaygroups.*, original_flyway.populationname
  	    AS original_popname, original_flyway.a as original_a,
        original_flyway.b as original_b, original_flyway.c as original_c
	    FROM species_and_flywaygroups
	    INNER JOIN original_flyway
      ON st_intersects(species_and_flywaygroups.the_geom, original_flyway.the_geom)
	    INNER JOIN confusion_species
      ON species_and_flywaygroups.ssid = confusion_species.species_id
    ),

	  confusion_populations AS (
	    SELECT confusion_species.*, confusion_flyways.the_geom, confusion_flyways.populationname,
        confusion_flyways.original_popname, confusion_flyways.original_a,
        confusion_flyways.original_b, confusion_flyways.original_c
	    FROM confusion_species
	    INNER JOIN confusion_flyways
      ON confusion_flyways.ssid = confusion_species.species_id )

    SELECT DISTINCT populations_species_no_geo.a, populations_species_no_geo.b,
      populations_species_no_geo.c, confusion_populations.*
    FROM populations_species_no_geo
    RIGHT JOIN confusion_populations
    ON confusion_populations.species_id = populations_species_no_geo.sisrecid
      AND confusion_populations.populationname = populations_species_no_geo.populations
    ORDER BY confusion_populations.taxonomic_sequence`;
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
  getSpeciesPopulation,
  getSpeciesThreats,
  getSpeciesHabitats,
  getSpeciesLookAlikeSpecies
};

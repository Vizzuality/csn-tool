const rp = require('request-promise-native');
const CARTO_SQL = require('../constants').CARTO_SQL;
const LayersService = require('../services/layers');
const normalizeSiteStatus = require('../helpers/index').normalizeSiteStatus;

function getSpeciesList(req, res) {
  const query = `SELECT s.scientific_name, s.english_name, s.genus, s.family, s.species_id as id,
      string_agg(p.populations, ', ') as population, s.hyperlink
    FROM species s
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    GROUP BY s.scientific_name, s.english_name, s.genus, s.family, s.species_id, 1,
    s.hyperlink
    ORDER BY s.scientific_name`;
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
  const query = `SELECT s.species_id, ss.csn_criteria as csn,
      ss.iba_criteria as iba, ss.maximum, ss.minimum, ss.season,
      si.country, si.site_name, si.lat, si.lon, si.iso2, si.protection_status,
      string_agg(p.populations, ', ') as population,
      si.hyperlink, si.site_id AS id
    FROM species s
    INNER JOIN species_sites ss ON s.species_id = ss.species_id
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    INNER JOIN sites si ON ss.site_id = si.site_id
    WHERE s.species_id = '${req.params.id}'
    GROUP BY ss.csn_criteria, ss.iba_criteria, ss.maximum, ss.minimum,
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
    p.species, p.wpepopid,
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

function getSpeciesLayers(req, res) {
  LayersService.getLayers('species', req.params.id)
    .then((layers) => {
      res.json(layers);
    })
    .catch((err) => {
      res.status(err.statusCode || 500);
      res.json({ error: err.message });
    });
}

function getSpeciesLookAlikeSpecies(req, res) {
  const query = `with s as (SELECT english_name, scientific_name,
    species.species_id, hyperlink, confusion_species_group
    FROM species inner join look_alike_species
    on species.species_id = look_alike_species.species_id),
    e as (select confusion_species_group
      from look_alike_species where species_id = '${req.params.id}'),
    f as (select s.* from s inner join e
      on s.confusion_species_group = e.confusion_species_group)
    select * from f`;
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

module.exports = {
  getSpeciesList,
  getSpeciesDetails,
  getSpeciesSites,
  getSpeciesPopulation,
  getSpeciesThreats,
  getSpeciesHabitats,
  getSpeciesLayers,
  getSpeciesLookAlikeSpecies
};

const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

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

function getSpeciesSites(req, res) {
  const query = `SELECT s.species_id as id, ss.csn_criteria as csn,
      ss.iba_criteria as iba, ss.maximum, ss.minimum, ss.season,
      si.country, si.site_name, si.lat, si.lon,
      string_agg(p.populations, ', ') as population,
      si.hyperlink
    FROM species s
    INNER JOIN species_sites ss ON s.species_id = ss.species_id
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    INNER JOIN sites si ON ss.site_id = si.site_id
    WHERE s.species_id = '${req.params.id}'
    GROUP BY ss.csn_criteria, ss.iba_criteria, ss.maximum, ss.minimum,
    ss.season, si.country, si.site_name, si.lat, si.lon,
    si.hyperlink, 1
    ORDER BY si.site_name`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const results = JSON.parse(data).rows || [];
      if (results && results.length > 0) {
        results.map((item) => {
          const species = item;
          species.avg = Math.floor((item.maximum + item.minimum) / 2);
          return species;
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
    p.species, p.wpepopid
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

module.exports = {
  getSpeciesList,
  getSpeciesSites,
  getSpeciesPopulation,
  getSpeciesThreats,
  getSpeciesHabitats
};

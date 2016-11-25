const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSpeciesList(req, res) {
  const query = `SELECT s.scientific_name, s.english_name, s.genus, s.family, s.slug,
      string_agg(p.populations, ', ') as population
    FROM species s
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    GROUP BY s.scientific_name, s.english_name, s.genus, s.family, s.slug, 1
    ORDER BY s.english_name`;
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
  const query = `SELECT s.slug, ss.csn_criteria as csn, ss.iba_criteria as iba, ss.maximum, ss.minimum, ss.season,
      si.country, si.site_name, si.lat, si.lon,
      string_agg(p.populations, ', ') as population
    FROM species s
    INNER JOIN species_sites ss ON s.species_id = ss.species_id
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    INNER JOIN sites si ON ss.site_id = si.site_id
    WHERE s.slug = '${req.params.slug}'
    GROUP BY ss.csn_criteria, ss.iba_criteria, ss.maximum, ss.minimum, ss.season, si.country, si.site_name, si.lat, si.lon, 1
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
  const query = `SELECT p.populations, p.a, p.b, p.c, table_1_status, p.species
    FROM species s
    INNER JOIN species_sites ss ON s.species_id = ss.species_id
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    INNER JOIN sites si ON ss.site_id = si.site_id
    WHERE s.slug = '${req.params.slug}'`;

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

module.exports = {
  getSpeciesList,
  getSpeciesSites,
  getSpeciesPopulation
};

const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSpeciesByPosition(req, res) {
  // TODO: BUILD QUERY USING THIS PARAMS
  console.info(req.params.lat);
  console.info(req.params.lng);
  console.info(req.params.zoom); // OPTIONAL
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

module.exports = {
  getSpeciesByPosition
};

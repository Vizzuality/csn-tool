const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSpeciesByPosition(req, res) {
  // TO include the geom
  // SELECT ST_AsGeoJSON(p.the_geom)
  const query = `SELECT p.populations, p.a, p.b, p.c, p.table_1_status, p.species, p.wpepopid, p.flyway_range, p.year_start,
    p.year_end, p.size_min, p.size_max, p.ramsar_criterion, 'http://wpe.wetlands.org/view/' || p.wpepopid AS pop_hyperlink, c.name AS country_name
    FROM populations AS p
    INNER JOIN world_borders AS c ON
    ST_CONTAINS(c.the_geom_webmercator, ST_Transform(ST_SetSRID(ST_MakePoint(${req.params.lng},${req.params.lat}), 4326), 3857))
    WHERE ST_CONTAINS(p.the_geom_webmercator,ST_Transform(ST_SetSRID(ST_MakePoint(${req.params.lng},${req.params.lat}), 4326), 3857))`;
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

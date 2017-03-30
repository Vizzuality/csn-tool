const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

function getSpeciesByPosition(req, res) {
  // TO include the geom
  // SELECT ST_AsGeoJSON(p.the_geom)
  const query = `SELECT
    p.species_main_id AS id,
    p.scientificname AS scientific_name,
    p.commonname AS english_name,
    p.population_name AS population, p.a, p.b, p.c, p.table_1_status,
    p.red_list_status AS iucn, p.caf_action_plan, p.eu_birds_directive,
    p.species, p.wpepopid, p.flyway_range, p.year_start,
    p.year_end, p.size_min, p.size_max, p.ramsar_criterion_6,
    'http://wpe.wetlands.org/view/' || p.wpepopid AS pop_hyperlink,
    c.name AS country_name
    FROM populations_iba AS p
    INNER JOIN world_borders AS c ON
    ST_CONTAINS(c.the_geom_webmercator, ST_Transform(ST_SetSRID(ST_MakePoint(${req.params.lng},${req.params.lat}), 4326), 3857))
    INNER JOIN species_main AS sm ON
    sm.species_id = p.species_main_id
    WHERE ST_CONTAINS(p.the_geom_webmercator,ST_Transform(ST_SetSRID(ST_MakePoint(${req.params.lng},${req.params.lat}), 4326), 3857))
    ORDER BY sm.taxonomic_sequence ASC`;
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

const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

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

function getCountry(req, res) {
  const query = `SELECT * FROM countries WHERE iso3='${req.params.iso}'`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
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
    SUM(case when csn_criteria = '' then 0 else 1 end) as csn,
      SUM(case when iba_criteria = '' then 0 else 1 end) as iba
        from species_sites group by site_id)
    SELECT c.country, c.iso3,
      s.protection_status, s.site_name, s.lat, s.lon, s.site_id as id,
      stc.csn, stc.iba
    FROM sites s
  	INNER JOIN countries c ON s.country_id = c.country_id AND
    c.iso3 = '${req.params.iso}'
  	INNER JOIN stc ON stc.site_id = s.site_id
    ORDER BY s.site_name`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
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

function getCountrySitesOld(req, res) {
  const query = `SELECT c.country, c.iso3,
      s.protected as protection_status, s.site_name, s.iba,
      CASE
        WHEN s.csn_species >= 0 THEN 'x'
        ELSE null
      END AS csn,
      s.csn_species, s.iba_species, s.total_percentage
    FROM sites_from_csn_old s
  	INNER JOIN countries c ON s.country_id = c.country_id AND
    c.iso3 = '${req.params.iso}'
    ORDER BY s.site_name`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
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
    s.species_id as id, string_agg(p.populations, ', ') as populations, s.hyperlink,
    sc.country_status
    FROM species s
    INNER JOIN species_country sc on sc.species_id = s.species_id
    INNER JOIN countries c on c.country_id = sc.country_id AND
      c.iso3 = '${req.params.iso}'
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    GROUP BY s.scientific_name, s.english_name, s.genus, s.family, s.species_id, 1,
    s.hyperlink, sc.country_status
    ORDER BY s.english_name`;
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
  const query = `with r as (
    SELECT ssis, wpepopid, wpesppid FROM
    populationflyways_idcodesonly_dissolved
    WHERE ST_Intersects(the_geom,
     (SELECT the_geom FROM world_borders WHERE iso3 = '${req.params.iso}'))),
  f AS (SELECT ssis,  wpepopid, wpesppid AS wpesppid FROM r ),
  d AS (select * from species s INNER JOIN f ON species_id=ssis)
  SELECT scientific_name, d.english_name, d.wpepopid pop_id, dd.* from d
  INNER JOIN populations_species_no_geo dd on d.wpepopid=dd.wpepopid
  ORDER BY d.scientific_name
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

module.exports = {
  getCountries,
  getCountry,
  getCountrySites,
  getCountrySitesOld,
  getCountrySpecies,
  getCountryPopulations
};

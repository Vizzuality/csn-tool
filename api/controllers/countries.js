const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;
const normalizeSiteStatus = require('../helpers/index').normalizeSiteStatus;

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

function getCountryDetails(req, res) {
  const query = `SELECT * FROM countries WHERE iso3='${req.params.iso}'`;
  rp(CARTO_SQL + query)
    .then((data) => {
      const result = JSON.parse(data);
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows[0]);
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
      s.protection_status, s.site_name, s.lat, s.lon, s.site_id as id, s.protection_status,
      stc.csn, stc.iba, s.hyperlink
    FROM sites s
  	INNER JOIN countries c ON s.country_id = c.country_id AND
    c.iso3 = '${req.params.iso}'
  	INNER JOIN stc ON stc.site_id = s.site_id
    ORDER BY s.site_name`;
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
    sc.country_status, s.iucn_category
    FROM species s
    INNER JOIN species_country sc on sc.species_id = s.species_id
    INNER JOIN countries c on c.country_id = sc.country_id AND
      c.iso3 = '${req.params.iso}'
    INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
    GROUP BY s.scientific_name, s.english_name, s.genus, s.family, s.species_id, 1,
    s.hyperlink, sc.country_status, s.iucn_category
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
  SELECT scientific_name, d.english_name, d.iucn_category, d.wpepopid pop_id, dd.*,
  'http://wpe.wetlands.org/view/' || d.wpepopid AS pop_hyperlink
  FROM d
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

function getCountrySimilarSpecies(req, res) {
  const query = `SELECT s.scientific_name, s.english_name, s.genus, s.family,
    s.species_id as id, ss.species_name, ss.confusion_species_group as confusing_species,
    sc.country_status, s.iucn_category, c.country
    FROM species s
    INNER JOIN species_country sc on sc.species_id = s.species_id
    INNER JOIN countries c on c.country_id = sc.country_id AND
      c.iso3 = '${req.params.iso}'
    INNER JOIN similar_species ss on ss.species_id = s.species_id
    WHERE ss.confusion_species_group != ''
    GROUP BY s.scientific_name, s.english_name, s.genus, s.family, s.species_id, 1,
    ss.species_name, ss.confusion_species_group, c.country,
    s.hyperlink, sc.country_status, s.iucn_category
    ORDER BY ss.confusion_species_group`;
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
  getCountryDetails,
  getCountrySites,
  getCountrySitesOld,
  getCountrySpecies,
  getCountryPopulations,
  getCountrySimilarSpecies
};

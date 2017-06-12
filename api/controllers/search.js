const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

async function getCountries() {
  try {
    const query = 'SELECT DISTINCT(country) as label, country_id as value FROM countries ORDER by country ASC';
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch (err) {
    return [];
  }
}

async function getSites() {
  try {
    const query = 'SELECT DISTINCT(site_name) as label, site_id as value, country_id FROM sites ORDER by site_name ASC';
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch (err) {
    return [];
  }
}

async function getFamilies() {
  try {
    const query = 'SELECT DISTINCT(family) as label, family as value FROM species ORDER by family ASC';
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch (err) {
    return [];
  }
}

async function getGenus() {
  try {
    const query = 'SELECT DISTINCT(genus) as label, genus as value FROM species ORDER by genus ASC';
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch (err) {
    return [];
  }
}

async function getSpecies() {
  try {
    const query = 'SELECT DISTINCT(scientific_name) as label, species_id as value, family, genus FROM species ORDER by scientific_name ASC';
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch (err) {
    return [];
  }
}

async function getHabitats() {
  try {
    const query = 'SELECT DISTINCT(habitat_name) as label, habitat_id as value FROM sites_habitats ORDER by habitat_name ASC';
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch (err) {
    return [];
  }
}

async function getOptions(req, res) {
  try {
    const queries = [];
    queries.push(getCountries());
    queries.push(getSites());
    queries.push(getFamilies());
    queries.push(getGenus());
    queries.push(getSpecies());
    queries.push(getHabitats());
    const options = await Promise.all(queries);
    res.json({
      country: options[0],
      site: options[1],
      family: options[2],
      genus: options[3],
      species: options[4],
      habitat: options[5]
    });
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

function parseParams(query) {
  const params = {};
  Object.keys(query).forEach((key) => {
    if (query[key] && query[key] !== 'undefined') {
      params[key] = query[key].split(',');
    }
  });
  return params;
}

async function getSitesResults(req, res) {
  // TODO: get sites search querying by
  // countries='country_id1, country_id2'
  // sites='site_id'
  // family='familyName1,familyName2'
  // genus='genusName1,genusName2'
  // species='speciesId1,speciesId2'
  // from req.query['paramName']
  try {
    const params = parseParams(req.query);
    const query = `with stc as (select site_id,
      SUM(case when iba_criteria = '' then 0 else 1 end) as iba
      from species_sites group by site_id)
      SELECT s.site_name, s.country, s.iso2,
      s.protection_status as protected, stc.iba AS iba_species,
      s.hyperlink,
      CASE s.iba_in_danger
        WHEN true THEN true
        ELSE false
      END AS iba_in_danger
      , s.site_id AS id
      FROM sites s
      LEFT JOIN stc ON stc.site_id = s.site_id
      ${params.species || params.genus || params.family
        ? `JOIN species_sites ss ON ss.site_id = s.site_id
          JOIN species ON ss.species_id = species.species_id AND (
            ${params.species ? `species.species_id IN(${params.species.join()})` : false}
            OR ${params.genus ? `species.genus IN('${params.genus.join('\',\'')}')` : false}
            OR ${params.family ? `species.family IN('${params.family.join('\',\'')}')` : false}
          )`
        : ''}
      ${params.habitat
        ? `JOIN sites_habitats sh ON sh.site_id = s.site_id AND habitat_id IN (${params.habitat.join()})`
        : ''
      }
      ${params.country ? `WHERE country_id IN(${params.country.join()})` : ''}
      GROUP BY s.site_name, s.country, s.iso2, s.protection_status, s.hyperlink,
      s.iba_in_danger, s.site_id, stc.iba
      ORDER by country ASC, site_name ASC`;
    const data = await rp(CARTO_SQL + query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

async function getSpeciesResults(req, res) {
  try {
    const params = parseParams(req.query);
    const query = `SELECT s.scientific_name, s.genus, s.english_name, s.family,
      s.species_id AS id, string_agg(DISTINCT p.populations, ', ') as population, s.iucn_category, s.hyperlink
      FROM species_main s
      INNER JOIN populations_species_no_geo p on p.sisrecid = s.species_id
      ${params.country && !params.site
        ? `
          JOIN species_sites ss ON ss.species_id = s.species_id
          JOIN species_country AS sc ON sc.country_id IN(${params.country.join()}) AND
          sc.country_status != 'Vagrant'
          JOIN sites ON ss.site_id = sites.site_id AND sites.country_id = sc.country_id
          `
        : ''}
      ${params.site
        ? `JOIN species_sites ss ON ss.species_id = s.species_id
          JOIN sites ON ss.site_id = sites.site_id AND sites.site_id IN(${params.site.join()})`
        : ''}
      ${params.species || params.genus || params.family
        ? `WHERE (
            ${params.species ? `s.id IN(${params.species.join()})` : false}
            OR ${params.genus ? `s.genus IN('${params.genus.join('\',\'')}')` : false}
            OR ${params.family ? `s.family IN('${params.family.join('\',\'')}')` : false}
          )`
        : ''
      }
      GROUP BY s.scientific_name, s.family, s.genus, s.english_name, s.species_id,
      s.iucn_category, s.hyperlink, s.taxonomic_sequence
      ORDER by taxonomic_sequence ASC`;
    const data = await rp(CARTO_SQL + query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

async function getPopulationsResults(req, res) {
  // TODO: Add filtering by Habitat
  try {
    const params = parseParams(req.query);
    const query = `SELECT
      s.scientific_name,
      s.english_name,
      s.iucn_category,
      pi.wpepopid AS pop_id,
      s.species_id AS id,
      'http://wpe.wetlands.org/view/' || pi.wpepopid AS pop_hyperlink,
      pi.caf_action_plan, pi.eu_birds_directive,
      pi.a, pi.b, pi.c, pi.flyway_range,
      pi.year_start, pi.year_end,
      pi.size_min, pi.size_max,
      pi.population_name AS population,
      pi.ramsar_criterion_6 AS ramsar_criterion
      FROM populations_iba AS pi
      JOIN species_main s ON pi.species_main_id = s.species_id
      ${params.country && !params.site
        ? `JOIN species_sites ss ON ss.species_id = s.species_id
          JOIN species_country sc ON sc.country_id IN(${params.country.join()}) AND
          sc.country_status != 'Vagrant'
          JOIN sites ON ss.site_id = sites.site_id AND sites.country_id = sc.country_id
          JOIN world_borders AS wb ON wb.iso3 = sc.iso
          AND ST_INTERSECTS(pi.the_geom, wb.the_geom)
          `
        : ''}
      ${params.site
        ? `JOIN species_sites ss ON ss.species_id = s.species_id
          JOIN sites ON ss.site_id = sites.site_id AND sites.site_id IN(${params.site.join()})`
        : ''}
      ${params.species || params.genus || params.family
        ? `WHERE (
            ${params.species ? `s.id IN(${params.species.join()})` : false}
            OR ${params.genus ? `s.genus IN('${params.genus.join('\',\'')}')` : false}
            OR ${params.family ? `s.family IN('${params.family.join('\',\'')}')` : false}
          )`
        : ''
      }
      GROUP by s.scientific_name, s.english_name, s.iucn_category, pi.wpepopid,
      s.species_id, pi.caf_action_plan, pi.eu_birds_directive, pi.a, pi.b, pi.c,
      pi.flyway_range, pi.year_start, pi.year_end, pi.size_min, pi.size_max,
      pi.population_name, pi.ramsar_criterion_6, s.taxonomic_sequence
      ORDER by s.taxonomic_sequence ASC`;
    const data = await rp(CARTO_SQL + query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

module.exports = {
  getOptions,
  getSitesResults,
  getSpeciesResults,
  getPopulationsResults
};

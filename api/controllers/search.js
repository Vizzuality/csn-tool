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
    const query = 'SELECT DISTINCT(site_name) as label, iso3 as value, country_id FROM sites ORDER by site_name ASC';
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
    const query = `SELECT s.site_name, s.country
      FROM sites s
      ${params.species || params.genus || params.family
        ? `JOIN species_sites ss ON ss.site_id = s.site_id
          JOIN species ON ss.species_id = species.species_id AND (
            ${params.species ? `species.id IN(${params.species.join()})` : false}
            OR ${params.genus ? `species.genus IN('${params.genus.join('\',\'')}')` : false}
            OR ${params.family ? `species.family IN('${params.family.join('\',\'')}')` : false}
          )`
        : ''}
      ${params.habitat
        ? `JOIN sites_habitats sh ON sh.site_id = s.site_id AND habitat_id IN (${params.habitat.join()})`
        : ''
      }
      ${params.country ? `WHERE country_id IN(${params.country.join()})` : ''}
      GROUP BY s.site_name, s.country
      ORDER by site_name ASC`;
    const data = await rp(CARTO_SQL + query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

async function getSpeciesResults(req, res) {
  try {
    const query = 'SELECT DISTINCT(site_name) as label, iso3 as value FROM sites ORDER by site_name ASC';
    const data = await rp(CARTO_SQL + query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

async function getPopulationsResults(req, res) {
  try {
    const query = 'SELECT DISTINCT(site_name) as label, iso3 as value FROM sites ORDER by site_name ASC';
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

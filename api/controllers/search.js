const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

async function getCountries() {
  try {
    const query = `SELECT DISTINCT(country) as label, country_id as value FROM countries ORDER by country ASC`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getSites() {
  try {
    const query = `SELECT DISTINCT(site_name) as label, iso3 as value FROM sites ORDER by site_name ASC`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getFamilies() {
  try {
    const query = `SELECT DISTINCT(family) as label, family as value FROM species ORDER by family ASC`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getGenus() {
  try {
    const query = `SELECT DISTINCT(genus) as label, genus as value FROM species ORDER by genus ASC`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getSpecies() {
  try {
    const query = `SELECT DISTINCT(scientific_name) as label, species_id as value FROM species ORDER by scientific_name ASC`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getHabitats() {
  try {
    const query = `SELECT DISTINCT(habitat_name) as label, habitat_id as value FROM sites_habitats ORDER by habitat_name ASC`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
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
    })
  } catch(err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  };
}

async function getSitesResults(req, res) {
  try {
    const data = await getSites();
    res.json({ results: data });
  } catch(err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  };
}

async function getSpeciesResults(req, res) {
  try {
    const data = await getSites();
    res.json({ results: data });
  } catch(err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  };
}

async function getPopulationsResults(req, res) {
  try {
    const data = await getSites();
    res.json({ results: data });
  } catch(err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  };
}

module.exports = {
  getOptions,
  getSitesResults,
  getSpeciesResults,
  getPopulationsResults
};

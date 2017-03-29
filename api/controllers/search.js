const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;

async function getCountries() {
  try {
    const query = `SELECT country as label, iso3 as value FROM countries`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getSites() {
  try {
    const query = `SELECT site_name as label, iso3 as value FROM sites`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getFamilies() {
  try {
    const query = `SELECT family as label, family as value FROM species`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getGenus() {
  try {
    const query = `SELECT genus as label, genus as value FROM species`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getSpecies() {
  try {
    const query = `SELECT scientific_name as label, species_id as value FROM species`;
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch(err) {
    return [];
  }
}

async function getHabitats() {
  try {
    const query = `SELECT habitat_name as label, habitat_id as value FROM sites_habitats`;
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
      countries: options[0],
      sites: options[1],
      families: options[2],
      genus: options[3],
      species: options[4],
      habitats: options[5]
    })
  } catch(err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  };
}

module.exports = {
  getOptions
};

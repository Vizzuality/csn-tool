/* eslint-disable camelcase */

const { runQuery } = require('../helpers');

const booleanOptions = [true, false].map((value) => ({ label: value.toString(), value }));

async function getGeneral(query) {
  try {
    if (query.isBoolean) return booleanOptions;
    const data = await runQuery(query);
    return JSON.parse(data).rows || [];
  } catch (err) {
    return [];
  }
}

const queryProducer = (table, label, value, extraColumns) => (`
  SELECT DISTINCT(${label}) as label, ${value || label} as value ${extraColumns ? `, ${extraColumns.join(', ')}` : ''}
  FROM ${table}
  WHERE coalesce(${label}, '') != ''
  ORDER BY ${label} ASC
`);

const optionQueries = [
  // geography
  { name: 'country', query: queryProducer('countries', 'country', 'country_id') },
  { name: 'ramsar_region', query: queryProducer('countries', 'trim(ramsar_region)') },
  { name: 'aewa_region', query: queryProducer('countries', 'trim(aewa_region)') },
  { name: 'site', query: queryProducer('sites_iba', 'site_name', 'site_id', ['country_id']) },
  { name: 'protection', query: queryProducer('sites_iba', 'protection_status') },
  { name: 'site_threat', query: queryProducer('sites_threats', 'threat_name', 'threat_id') },
  { name: 'site_habitat', query: queryProducer('sites_habitats', 'habitat_name', 'habitat_id') },
  // species attributes
  { name: 'family', query: queryProducer('species', 'family') },
  { name: 'genus', query: queryProducer('species', 'genus', 'genus', ['family']) },
  { name: 'species', query: queryProducer('species', 'scientific_name', 'species_id', ['family', 'genus']) },
  { name: 'species_country_status', query: queryProducer('species_country', 'country_status') },
  { name: 'red_list_status', query: queryProducer('species', 'iucn_category') },
  { name: 'aewa_annex_2', query: { isBoolean: true } },
  { name: 'species_threat', query: queryProducer('species_threats', 'threat_level_1') },
  { name: 'species_habitat_association', query: queryProducer('species_habitat', 'habitat_level_1') },
  // population
  { name: 'aewa_table_1_status', query: queryProducer('populations', 'trim(table_1_status)') },
  { name: 'eu_birds_directive', query: { isBoolean: true } },
  { name: 'cms_caf_action_plan', query: { isBoolean: true } },
  { name: 'multispecies_flyway', query: queryProducer('populations', 'flyway_range') },
  { name: 'population_trend', query: queryProducer('populations', 'trend') }
];

async function getOptions(req, res) {
  try {
    const queries = optionQueries.map(({ query }) => getGeneral(query));
    const options = await Promise.all(queries);
    const queryReturns = {};
    optionQueries.forEach(({ name }, index) => {
      queryReturns[name] = options[index];
    });
    res.json(queryReturns);
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

function condition(column, value) {
  if (!Array.isArray(value)) {
    if (isNaN(value)) return `${column} = '${value}'`;
    return `${column} = ${value}`;
  }

  const anyNaN = value.some((v) => isNaN(v));

  if (anyNaN) return `${column} IN ('${value.join("','")}')`;
  return `${column} IN (${value.join()})`;
}

async function getIBAsResults(req, res) {
  // QUERY BY
  // country, aewa region, ramsar region, protection, site habitat, site threat
  // family, genus, species, red list status, aewa annex 2, species threat, species habitat association
  // NO QUERY BY site, any population
  try {
    const {
      aewa_annex_2,
      aewa_region,
      country,
      family,
      genus,
      protection,
      ramsar_region,
      red_list_status,
      site_habitat,
      site_threat,
      species,
      species_country_status,
      species_habitat_association,
      species_threat
    } = req.query;

    const joinSpeciesCountry = !!species_country_status;
    const joinSpecies = !!(joinSpeciesCountry || species || family || genus || red_list_status || aewa_annex_2);
    const joinSpeciesSites = !!(joinSpecies || species_threat || species_habitat_association);

    const where = [];
    const addCondition = (column, param, collection = where) => { if (param) collection.push(condition(column, param)); };

    // sites filters
    addCondition('c.country_id', country);
    addCondition('c.aewa_region', aewa_region);
    addCondition('c.ramsar_region', ramsar_region);
    addCondition('s.protection_status', protection);
    addCondition('sh.habitat_id', site_habitat);
    addCondition('st.threat_id', site_threat);
    addCondition('sp.species_id', species);
    addCondition('sp.genus', genus);
    addCondition('sp.family', family);
    addCondition('sp.iucn_category', red_list_status);
    addCondition('sp.aewa_annex_2', aewa_annex_2);
    addCondition('spt.threat_level_1', species_threat);
    addCondition('sph.habitat_level_1', species_habitat_association);
    addCondition('spc.country_status', species_country_status);

    const query = `
      WITH stc AS (
        SELECT
          site_id,
          SUM(case when iba_criteria = '' then 0 else 1 end) as iba
        FROM species_sites_iba GROUP BY site_id
      )
      SELECT
        s.site_id AS id,
        s.site_name,
        s.country,
        s.iso2,
        s.protection_status as protected,
        stc.iba AS iba_species,
        s.hyperlink,
        coalesce(s.iba_in_danger, false) as iba_in_danger
      FROM sites_iba s
      LEFT JOIN stc ON stc.site_id = s.site_id
      INNER JOIN countries c ON c.country_id = s.country_id
      ${joinSpeciesSites ? 'INNER JOIN species_sites_iba ss ON ss.site_id = s.site_id' : ''}
      ${joinSpecies ? 'INNER JOIN species sp ON ss.species_id = sp.species_id' : ''}
      ${joinSpeciesCountry ? 'INNER JOIN species_country spc ON spc.species_id = sp.species_id AND spc.country_id = c.country_id' : ''}
      ${species_threat ? 'INNER JOIN species_threats spt ON spt.species_id = ss.species_id' : ''}
      ${species_habitat_association ? 'INNER JOIN species_habitat sph ON sph.species_id = ss.species_id' : ''}
      ${site_habitat ? 'INNER JOIN sites_habitats sh ON sh.site_id = s.site_id' : ''}
      ${site_threat ? 'INNER JOIN sites_threats st ON st.site_id = s.site_id' : ''}
      ${where.length > 0 && `WHERE ${where.join(' AND ')}` || ''}
      GROUP BY s.site_name, s.country, s.iso2, s.protection_status, s.hyperlink,
      s.iba_in_danger, s.site_id, stc.iba
      ORDER by country ASC, site_name ASC`;

    const data = await runQuery(query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

async function getCriticalSitesResults(req, res) {
  try {
    const {
      aewa_annex_2,
      aewa_region,
      aewa_table_1_status,
      cms_caf_action_plan,
      country,
      eu_birds_directive,
      family,
      genus,
      multispecies_flyway,
      population_trend,
      protection,
      ramsar_region,
      red_list_status,
      site_habitat,
      site_threat,
      species,
      species_country_status,
      species_habitat_association,
      species_threat
    } = req.query;

    const joinPopulations = !!(aewa_table_1_status || cms_caf_action_plan || eu_birds_directive || multispecies_flyway || population_trend);
    const joinSpeciesCountry = !!species_country_status;
    const joinSpecies = !!(joinPopulations || joinSpeciesCountry || species || family || genus || red_list_status || aewa_annex_2);
    const joinSpeciesSites = !!(joinSpecies || species_threat || species_habitat_association);
    const where = [];
    const addCondition = (column, param, collection = where) => { if (param) collection.push(condition(column, param)); };

    // sites filters
    addCondition('c.country_id', country);
    addCondition('c.aewa_region', aewa_region);
    addCondition('c.ramsar_region', ramsar_region);
    addCondition('s.protection_status', protection);
    addCondition('sh.habitat_id', site_habitat);
    addCondition('st.threat_id', site_threat);
    addCondition('sp.species_id', species);
    addCondition('sp.genus', genus);
    addCondition('sp.family', family);
    addCondition('sp.iucn_category', red_list_status);
    addCondition('sp.aewa_annex_2', aewa_annex_2);
    addCondition('spt.threat_level_1', species_threat);
    addCondition('sph.habitat_level_1', species_habitat_association);
    addCondition('spc.country_status', species_country_status);
    // population filters
    addCondition('trim(pi.table_1_status)', aewa_table_1_status);
    addCondition('pi.caf_action_plan', cms_caf_action_plan);
    addCondition('pi.eu_birds_directive', eu_birds_directive);
    addCondition('pi.flyway_range', multispecies_flyway);
    addCondition('pi.trend', population_trend);

    const query = `
      WITH stc AS (
        SELECT site_id, COUNT(*) csn
        FROM species_sites_iba
        GROUP BY site_id
      )
      SELECT
        s.country,
        s.site_name_clean AS csn_name,
        s.protected,
        s.lat,
        s.lon,
        s.site_id AS id,
        stc.csn,
        s.iso3,
        s.iso2,
        s.total_percentage
      FROM sites_critical s
      LEFT JOIN stc ON stc.site_id = s.site_id
      INNER JOIN countries c ON c.iso2 = s.iso2
      ${joinSpeciesSites ? 'INNER JOIN species_sites_iba ss ON ss.site_id = s.site_id' : ''}
      ${joinSpecies ? 'INNER JOIN species sp ON ss.species_id = sp.species_id' : ''}
      ${joinSpeciesCountry ? 'INNER JOIN species_country spc ON spc.species_id = sp.species_id AND spc.country_id = c.country_id' : ''}
      ${joinPopulations ? 'INNER JOIN populations pi ON pi.species_main_id = sp.species_id' : ''}
      ${species_threat ? 'INNER JOIN species_threats spt ON spt.species_id = ss.species_id' : ''}
      ${species_habitat_association ? 'INNER JOIN species_habitat sph ON sph.species_id = ss.species_id' : ''}
      ${site_habitat ? 'INNER JOIN sites_habitats sh ON sh.site_id = s.site_id' : ''}
      ${site_threat ? 'INNER JOIN sites_threats st ON st.site_id = s.site_id' : ''}
      ${where.length > 0 && `WHERE ${where.join(' AND ')}` || ''}
      GROUP BY s.country, csn_name, s.protected, s.lat, s.lon, s.site_id, s.iso3,
        s.iso2, s.total_percentage, stc.csn
      ORDER BY s.country ASC, csn_name ASC`;

    const data = await runQuery(query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

async function getSpeciesResults(req, res) {
  try {
    const {
      aewa_annex_2,
      aewa_region,
      aewa_table_1_status,
      cms_caf_action_plan,
      country,
      eu_birds_directive,
      family,
      genus,
      multispecies_flyway,
      population_trend,
      protection,
      ramsar_region,
      red_list_status,
      site,
      site_habitat,
      site_threat,
      species,
      species_country_status,
      species_habitat_association,
      species_threat
    } = req.query;

    const joinCountries = !!(country || aewa_region || ramsar_region || species_country_status);
    const joinSites = !!(site || protection);
    const joinSpeciesSites = !!(joinSites || site_habitat || site_threat);
    const joinPopulations = !!(aewa_table_1_status || cms_caf_action_plan || eu_birds_directive || multispecies_flyway || population_trend);
    const where = [];
    const addCondition = (column, param, collection = where) => { if (param) collection.push(condition(column, param)); };

    addCondition('sp.species_id', species);
    addCondition('sp.genus', genus);
    addCondition('sp.family', family);
    addCondition('sp.aewa_annex_2', aewa_annex_2);
    addCondition('sp.iucn_category', red_list_status);
    addCondition('spt.threat_level_1', species_threat);
    addCondition('sph.habitat_level_1', species_habitat_association);
    // sites filters
    addCondition('s.site_id', site);
    addCondition('s.protection_status', protection);
    addCondition('sh.habitat_id', site_habitat);
    addCondition('st.threat_id', site_threat);
    addCondition('c.aewa_region', aewa_region);
    addCondition('c.ramsar_region', ramsar_region);
    addCondition('spc.country_status', species_country_status);
    if (country && !site) {
      addCondition('spc.country_id', country);
    }
    // population filters
    addCondition('trim(pi.table_1_status)', aewa_table_1_status);
    addCondition('pi.caf_action_plan', cms_caf_action_plan);
    addCondition('pi.eu_birds_directive', eu_birds_directive);
    addCondition('pi.flyway_range', multispecies_flyway);
    addCondition('pi.trend', population_trend);

    const query = `
      SELECT
        sp.scientific_name,
        sp.genus,
        sp.english_name,
        sp.french_name,
        sp.family,
        sp.species_id AS id,
        sp.iucn_category,
        sp.hyperlink
      FROM species sp
      ${joinPopulations ? 'INNER JOIN populations pi ON pi.species_main_id = sp.species_id' : ''}
      ${joinCountries &&
        `INNER JOIN species_country spc ON spc.species_id = sp.species_id
         INNER JOIN countries c ON c.country_id = spc.country_id` || ''}
      ${joinSpeciesSites ? 'INNER JOIN species_sites_iba ss ON ss.species_id = sp.species_id' : ''}
      ${joinSites ? 'INNER JOIN sites_iba s ON ss.site_id = s.site_id' : ''}
      ${species_threat ? 'INNER JOIN species_threats spt ON spt.species_id = sp.species_id' : ''}
      ${species_habitat_association ? 'INNER JOIN species_habitat sph ON sph.species_id = sp.species_id' : ''}
      ${site_habitat ? 'INNER JOIN sites_habitats sh ON sh.site_id = ss.site_id' : ''}
      ${site_threat ? 'INNER JOIN sites_threats st ON st.site_id = ss.site_id' : ''}
      ${where.length > 0 && `WHERE ${where.join(' AND ')}` || ''}
      GROUP BY sp.scientific_name, sp.family, sp.genus, sp.english_name, sp.french_name, sp.species_id,
        sp.iucn_category, sp.hyperlink, sp.taxonomic_sequence
      ORDER by taxonomic_sequence ASC`;
    const data = await runQuery(query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

async function getPopulationsResults(req, res) {
  try {
    const {
      aewa_annex_2,
      aewa_region,
      aewa_table_1_status,
      cms_caf_action_plan,
      country,
      eu_birds_directive,
      family,
      genus,
      multispecies_flyway,
      population_trend,
      protection,
      ramsar_region,
      red_list_status,
      site,
      site_habitat,
      site_threat,
      species,
      species_country_status,
      species_habitat_association,
      species_threat
    } = req.query;

    const joinCountries = !!(country || aewa_region || ramsar_region || species_country_status);
    const joinSites = !!(site || protection);
    const joinSpeciesSites = !!(joinSites || site_habitat || site_threat);
    const where = [];
    const addCondition = (column, param, collection = where) => { if (param) collection.push(condition(column, param)); };

    addCondition('sp.species_id', species);
    addCondition('sp.genus', genus);
    addCondition('sp.family', family);
    addCondition('sp.aewa_annex_2', aewa_annex_2);
    addCondition('sp.iucn_category', red_list_status);
    addCondition('spt.threat_level_1', species_threat);
    addCondition('sph.habitat_level_1', species_habitat_association);
    // sites filters
    addCondition('s.site_id', site);
    addCondition('s.protection_status', protection);
    addCondition('sh.habitat_id', site_habitat);
    addCondition('st.threat_id', site_threat);
    addCondition('c.aewa_region', aewa_region);
    addCondition('c.ramsar_region', ramsar_region);
    addCondition('spc.country_status', species_country_status);
    if (country && !site) {
      addCondition('spc.country_id', country);
    }
    // population filters
    addCondition('trim(pi.table_1_status)', aewa_table_1_status);
    addCondition('pi.caf_action_plan', cms_caf_action_plan);
    addCondition('pi.eu_birds_directive', eu_birds_directive);
    addCondition('pi.flyway_range', multispecies_flyway);
    addCondition('pi.trend', population_trend);

    const query = `SELECT
      sp.scientific_name,
      sp.english_name,
      sp.french_name,
      sp.iucn_category,
      pi.wpepopid AS pop_id,
      sp.species_id AS id,
      'http://wpe.wetlands.org/view/' || pi.wpepopid AS pop_hyperlink,
      pi.caf_action_plan,
      pi.eu_birds_directive,
      pi.a,
      pi.b,
      pi.c,
      pi.flyway_range,
      pi.year_start,
      pi.year_end,
      pi.size_min,
      pi.size_max,
      pi.population_name AS population,
      pi.ramsar_criterion_6 AS ramsar_criterion
      FROM populations AS pi
      INNER JOIN species sp ON pi.species_main_id = sp.species_id
      ${joinCountries &&
        `INNER JOIN species_country spc ON spc.species_id = sp.species_id
         INNER JOIN countries c ON c.country_id = spc.country_id
         INNER JOIN world_borders AS wb ON wb.iso3 = spc.iso AND ST_INTERSECTS(pi.the_geom, wb.the_geom)` || ''}
      ${joinSpeciesSites ? 'INNER JOIN species_sites_iba ss ON ss.species_id = sp.species_id' : ''}
      ${joinSites ? 'INNER JOIN sites_iba s ON ss.site_id = s.site_id' : ''}
      ${species_threat ? 'INNER JOIN species_threats spt ON spt.species_id = sp.species_id' : ''}
      ${species_habitat_association ? 'INNER JOIN species_habitat sph ON sph.species_id = sp.species_id' : ''}
      ${site_habitat ? 'INNER JOIN sites_habitats sh ON sh.site_id = ss.site_id' : ''}
      ${site_threat ? 'INNER JOIN sites_threats st ON st.site_id = ss.site_id' : ''}
      ${where.length > 0 && `WHERE ${where.join(' AND ')}` || ''}
      GROUP by sp.scientific_name, sp.english_name, sp.french_name, sp.iucn_category, pi.wpepopid,
      sp.species_id, pi.caf_action_plan, pi.eu_birds_directive, pi.a, pi.b, pi.c,
      pi.flyway_range, pi.year_start, pi.year_end, pi.size_min, pi.size_max,
      pi.population_name, pi.ramsar_criterion_6, sp.taxonomic_sequence
      ORDER by sp.taxonomic_sequence ASC`;
    const data = await runQuery(query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

module.exports = {
  getOptions,
  getCriticalSitesResults,
  getIBAsResults,
  getSpeciesResults,
  getPopulationsResults
};

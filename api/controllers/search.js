/* eslint-disable camelcase */

const rp = require('request-promise');
const CARTO_SQL = require('../constants').CARTO_SQL;
const AS_STRING = "', '";

async function getGeneral(query) {
  try {
    const data = await rp(CARTO_SQL + query);
    return JSON.parse(data).rows || [];
  } catch (err) {
    return [];
  }
}

const queryProducer = (table, label, value) => {
  let formattedLabel = label;
  if (['eu_birds_directive', 'caf_action_plan', 'aewa_annex_2'].includes(label)) {
    formattedLabel = `CAST(${label} as CHAR(50))`;
  }
  return `SELECT DISTINCT(${formattedLabel}) as label, ${value || label} as value FROM ${table} ORDER BY ${label} ASC`;
};

const optionQueries = [
  // geography
  { name: 'country', query: queryProducer('countries', 'country', 'country_id') },
  { name: 'ramsar_region', query: queryProducer('countries', 'ramsar_region') },
  { name: 'aewa_region', query: queryProducer('countries', 'aewa_region') },
  { name: 'site', query: queryProducer('sites', 'site_name', 'site_id') },
  { name: 'protection', query: queryProducer('sites', 'protection_status') },
  { name: 'site_threat', query: queryProducer('sites_threats', 'threat_name', 'threat_id') },
  { name: 'site_habitat', query: queryProducer('sites_habitats', 'habitat_name', 'habitat_id') },
  // species attributes
  { name: 'family', query: queryProducer('species_main', 'family') },
  { name: 'genus',
    query: 'SELECT DISTINCT(genus) as label, genus as value, family FROM species_main ORDER by genus ASC' },
  { name: 'species',
    query: 'SELECT DISTINCT(scientific_name) as label, species_id as value, family, genus FROM species_main ORDER by scientific_name ASC' },
  { name: 'red_list_status', query: queryProducer('species_main', 'iucn_category') },
  { name: 'aewa_annex_2', query: queryProducer('species_main', 'aewa_annex_2') },
  { name: 'species_threat', query: queryProducer('species_threats', 'threat_level_1') },
  { name: 'species_habitat_association', query: queryProducer('species_habitat', 'habitat_level_1') },
  // population
  { name: 'aewa_table_1_status', query: queryProducer('populations_iba', 'a') },
  { name: 'eu_birds_directive', query: queryProducer('populations_iba', 'eu_birds_directive') },
  { name: 'cms_caf_action_plan', query: queryProducer('populations_iba', 'caf_action_plan') },
  { name: 'multispecies_flyway', query: queryProducer('populations_iba', 'flyway_range') },
  { name: 'population_trend', query: '' }
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

function parseParams(query) {
  const params = {};
  // wrap in array
  Object.keys(query).forEach((key) => {
    params[key] = Array.isArray(query[key]) ? query[key] : Array.of(query[key]);
  });
  return params;
}

async function getIBAsResults(req, res) {
  // QUERY BY
  // country, aewa region, ramsar region, protection, site habitat, site threat
  // family, genus, species, red list status, aewa annex 2, species threat, species habitat association
  // NO QUERY BY site, any population
  try {
    const params = parseParams(req.query);
    const {
      aewa_region,
      aewa_annex_2,
      country,
      family,
      genus,
      protection,
      ramsar_region,
      site_habitat,
      site_threat,
      species,
      species_threat,
      species_habitat_association,
      red_list_status
    } = params;

    const joinSpeciesSites = (species || family || genus || species_threat || species_habitat_association);
    const joinSpecies = (species || family || genus || red_list_status || aewa_annex_2);
    // console.log('params', params);
    const where = [];
    if (country) {
      where.push(`c.country_id IN(${country.join()})`);
    }
    if (aewa_region) {
      where.push(`c.aewa_region IN ('${aewa_region.join(AS_STRING)}')`);
    }
    if (ramsar_region) {
      where.push(`c.ramsar_region IN ('${ramsar_region.join(AS_STRING)}')`);
    }
    if (protection) {
      where.push(`protection_status IN ('${protection.join(AS_STRING)}')`);
    }
    if (species_threat) {
      where.push(`spt.threat_level_1 IN ('${species_threat.join(AS_STRING)}')`);
    }
    if (species_habitat_association) {
      where.push(`sph.habitat_level_1 IN ('${species_habitat_association.join(AS_STRING)}')`);
    }
    if (site_habitat) {
      where.push(`sh.habitat_id IN (${site_habitat.join()})`);
    }
    if (site_threat) {
      where.push(`st.threat_id IN (${site_threat.join()})`);
    }
    if (red_list_status) {
      where.push(`s.iucn_category IN ('${red_list_status.join(AS_STRING)}')`);
    }
    if (species || genus || family) {
      where.push(`
       (${species ? `sp.species_id IN(${species.join()})` : false}
         OR ${genus ? `sp.genus IN('${genus.join(AS_STRING)}')` : false}
         OR ${family ? `sp.family IN('${family.join(AS_STRING)}')` : false})`
      );
    }
    if (aewa_annex_2) {
      where.push(`sp.aewa_annex_2 = ${aewa_annex_2}`);
    }

    const query = `
      WITH stc AS (
        SELECT
          site_id,
          SUM(case when iba_criteria = '' then 0 else 1 end) as iba
        FROM species_sites GROUP BY site_id
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
      FROM sites s
      LEFT JOIN stc ON stc.site_id = s.site_id
      INNER JOIN countries c ON c.country_id = s.country_id
      ${joinSpeciesSites ? 'INNER JOIN species_sites ss ON ss.site_id = s.site_id' : ''}
      ${joinSpecies ? 'INNER JOIN species_main sp ON ss.species_id = sp.species_id' : ''}
      ${species_threat ? 'INNER JOIN species_threats spt ON spt.species_id = ss.species_id' : ''}
      ${species_habitat_association ? 'INNER JOIN species_habitat sph ON sph.species_id = ss.species_id' : ''}
      ${site_habitat ? 'INNER JOIN sites_habitats sh ON sh.site_id = s.site_id' : ''}
      ${site_threat ? 'INNER JOIN sites_threats st ON st.site_id = s.site_id' : ''}
      ${where.length > 0 && `WHERE ${where.join(' AND ')}` || ''}
      GROUP BY s.site_name, s.country, s.iso2, s.protection_status, s.hyperlink,
      s.iba_in_danger, s.site_id, stc.iba
      ORDER by country ASC, site_name ASC`;

    // console.log('query', query);

    const data = await rp(CARTO_SQL + query);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  }
}

async function getCriticalSitesResults(req, res) {
  try {
    // TODO: write the query
    res.json(JSON.parse([]));
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
  getCriticalSitesResults,
  getIBAsResults,
  getSpeciesResults,
  getPopulationsResults
};

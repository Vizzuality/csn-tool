import { uniqueBy } from 'helpers/data';

const PROTECTION_LEVELS_ORDER = ['Little/none', 'Some', 'Most', 'Whole', 'Unknown'];

function getSitesLegendSection(sites, isActive) {
  if (!sites || !sites.length) return null;

  const uniqueSites = uniqueBy(sites, 'protected_slug').map((site) => ({
    icon: 'circle',
    name: site.protected,
    status: site.protected_slug
  }));

  uniqueSites.sort(
    (a, b) => PROTECTION_LEVELS_ORDER.indexOf(a.name) - PROTECTION_LEVELS_ORDER.indexOf(b.name)
  );

  return {
    i18nName: 'protectionLevel',
    active: isActive,
    layer: 'sites',
    data: uniqueSites
  };
}

function getPopulationsLegendSection(populations, populationColors, isActive) {
  if (!populations || !populations.length) return null;

  const mappedPopulation = (populations || []).map((pop) => ({
    icon: 'dots',
    id: pop.wpepopid,
    name: pop.population,
    color: populationColors[pop.wpepopid]
  }));
  return {
    i18nName: 'populationBoundaries',
    active: isActive,
    layer: 'population',
    data: mappedPopulation.sort((a, b) => a.name.toString() > b.name.toString())
  };
}

export function getLegendData(state, { populations, populationColors }) {
  const legend = [];
  const showSiteProtectionLevels = ['sites', 'criticalSites'].includes(state.selectedCategory);

  if (showSiteProtectionLevels) {
    const sites = state[state.selectedCategory][state.selected];
    legend.push(getSitesLegendSection(sites, state.layers.sites));
  }
  legend.push(getPopulationsLegendSection(populations, populationColors, state.layers.population));
  return legend.filter(l => l);
}

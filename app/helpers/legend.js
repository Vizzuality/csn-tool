import { uniqueBy } from 'helpers/data';

const PROTECTION_LEVELS_ORDER = ['Little/none', 'Some', 'Most', 'Whole', 'Unknown'];
const HYDROLOGY_SECTIONS = [
  {
    name: 'Freshwater flow',
    layer: 'freshwaterFlow',
    subSections: [
      {
        layer: 'freshwaterFlowPresent',
        name: 'Average annual freshwater flow (present)',
        scale: [
          {
            name: '1 month',
            color: '#cbf5ff'
          },
          {
            name: '12 months',
            color: '#30cf92'
          }
        ]
      },
      {
        layer: 'freshwaterFlow2050',
        name: '% change in annual freshwater flow (2050)',
        items: [
          {
            name: 'Blueish colors (+10% to +100% increase)',
            icon: 'dots',
            color: '#cbf5ff'
          },
          {
            name: 'Reddish colors (-10% to -100% decrease)',
            icon: 'dots',
            color: '#30cf92'
          }
        ]
      }
    ]
  },
  {
    name: 'Inudation',
    layer: 'inudation',
    subSections: [
      {
        layer: 'inundationPresent',
        name: 'Average number of months inundated per year (present)',
        scale: [
          {
            name: '1 month',
            color: '#fff'
          },
          {
            name: '12 months',
            color: '#370093'
          }
        ]
      },
      {
        layer: 'inundation2050',
        name: 'Change in inundation duration (2050)',
        items: [
          {
            name: 'Blueish colors (+10% to +100% increase)',
            icon: 'dots',
            color: '#cbf5ff'
          },
          {
            name: 'Reddish colors (2 to 12 months decrease)',
            icon: 'dots',
            color: '#30cf92'
          }
        ]
      }
    ]
  }
];

function getSitesLegendSection(sites, isActive) {
  if (!sites || !sites.length) return null;

  const uniqueSites = uniqueBy(sites, 'protected_slug').map(site => ({
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
    items: uniqueSites
  };
}

function getPopulationsLegendSection(populations, populationColors, isActive) {
  if (!populations || !populations.length) return null;

  const mappedPopulation = (populations || []).map(pop => ({
    icon: 'dots',
    id: pop.wpepopid,
    name: pop.population,
    color: populationColors[pop.wpepopid]
  }));
  return {
    i18nName: 'populationBoundaries',
    active: isActive,
    layer: 'population',
    items: mappedPopulation.sort((a, b) => a.name.toString() > b.name.toString())
  };
}

export function getHydrologySections(layers) {
  const activeLayers = Object.keys(layers).filter(key => layers[key]);

  return HYDROLOGY_SECTIONS.map(section => {
    const subSections = section.subSections.map(s => ({
      ...s,
      active: activeLayers.includes(s.layer)
    }));

    return {
      ...section,
      subSections,
      active: activeLayers.includes(section.layer)
    };
  });
}

export function getLegendData(state, { populations, populationColors }) {
  const legend = [];
  const showSiteProtectionLevels = ['sites', 'criticalSites'].includes(state.selectedCategory);

  if (showSiteProtectionLevels) {
    const sites = state[state.selectedCategory][state.selected];
    legend.push(getSitesLegendSection(sites, state.layers.sites));
  }
  legend.push(getPopulationsLegendSection(populations, populationColors, state.layers.population));
  legend.push(...getHydrologySections(state.layers));
  return legend.filter(l => l);
}

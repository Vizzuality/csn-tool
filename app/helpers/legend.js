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
            color: '#414df4'
          },
          {
            name: 'Reddish colors (-10% to -100% decrease)',
            icon: 'dots',
            color: '#f44242'
          }
        ]
      }
    ]
  },
  {
    name: 'Inundation',
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
            name: 'Blueish colors (2 to 12 months increase)',
            icon: 'dots',
            color: '#414df4'
          },
          {
            name: 'Reddish colors (2 to 12 months decrease)',
            icon: 'dots',
            color: '#f44242'
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

function getSpeciesClimateLegendSection(climate_layers) {
  const climateSections = [
    {
    name: 'Climate Change - Present suitability',
    layer: 'present',
    climateSection: true,
    active: climate_layers && climate_layers.present,
    subSections: [
      {
      layer: 'present_w',
      name: 'Winter',
      active: climate_layers && climate_layers.present_layers.indexOf('w') > -1,
      scale: [
        {
        name: 'Not suitable',
        color: 'yellow'
      },
      {
        name: 'Suitable',
        color: '#008ae5'
      }
      ]
    },
    {
      layer: 'present_b',
      name: 'Breeding',
      active: climate_layers && climate_layers.present_layers.indexOf('b') > -1,
      scale: [
        {
        name: 'Not suitable',
        color: 'yellow'
      },
      {
        name: 'Suitable',
        color: '#008ae5'
      }
      ]
    },
    {
      layer: 'present_p',
      name: 'Passage',
      active: climate_layers && climate_layers.present_layers.indexOf('p') > -1,
      scale: [
        {
        name: 'Not suitable',
        color: 'yellow'
      },
      {
        name: 'Suitable',
        color: '#008ae5'
      }
      ]
    },
    {
      layer: 'present_S',
      name: 'Sedentary',
      active: climate_layers && climate_layers.present_layers.indexOf('S') > -1,
      scale: [
        {
        name: 'Not suitable',
        color: 'yellow'
      },
      {
        name: 'Suitable',
        color: '#008ae5'
      }
      ]
    }
    ]
  },
  {
    name: 'Climate Change - Future suitability',
    layer: 'future',
    climateSection: true,
    active: climate_layers && climate_layers.future,
    subSections: [
      {
      layer: 'future_w',
      name: 'Winter',
      active: climate_layers && climate_layers.future_layers.indexOf('w') > -1,
      scale: [
        {
        name: 'Not suitable',
        color: 'yellow'
      },
      {
        name: 'Suitable',
        color: '#008ae5'
      }
      ]
    },
    {
      layer: 'future_b',
      name: 'Breeding',
      active: climate_layers && climate_layers.future_layers.indexOf('b') > -1,
      scale: [
        {
        name: 'Not suitable',
        color: 'yellow'
      },
      {
        name: 'Suitable',
        color: '#008ae5'
      }
      ]
    },
    {
      layer: 'future_p',
      name: 'Passage',
      active: climate_layers && climate_layers.future_layers.indexOf('p') > -1,
      scale: [
        {
        name: 'Not suitable',
        color: 'yellow'
      },
      {
        name: 'Suitable',
        color: '#008ae5'
      }
      ]
    },
    {
      layer: 'future_S',
      name: 'Sedentary',
      active: climate_layers && climate_layers.future_layers.indexOf('S') > -1,
      scale: [
        {
        name: 'Not suitable',
        color: 'yellow'
      },
      {
        name: 'Suitable',
        color: '#008ae5'
      }
      ]
    }
    ]
  }
  ];
  return climateSections;
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
  var legend = [];
  const showSiteProtectionLevels = ['sites', 'criticalSites'].includes(state.selectedCategory);
  const showClimateLayers = state.layers.climate;

  if (showSiteProtectionLevels) {
    const sites = state[state.selectedCategory][state.selected];
    legend.push(getSitesLegendSection(sites, state.layers.sites));
  }

  //if(showCLimateLay
  legend.push(getPopulationsLegendSection(populations, populationColors, state.layers.population));
  legend.push(...getHydrologySections(state.layers));

  if (showClimateLayers) {
    legend = legend.concat(getSpeciesClimateLegendSection(state.layers.climate_layers));
  }
  return legend.filter(l => l);
}

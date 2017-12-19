import {
  GET_COUNTRIES_CRITICAL_SITES,
  GET_COUNTRIES_GEOM,
  GET_COUNTRIES_LIST,
  GET_COUNTRIES_LOOK_ALIKE_SPECIES_POPULATION,
  GET_COUNTRIES_POPULATIONS,
  GET_COUNTRIES_SIMILAR_SPECIES,
  GET_COUNTRIES_SITES,
  GET_COUNTRIES_SPECIES,
  GET_COUNTRIES_STATS,
  SET_COUNTRY_COLUMN_FILTER,
  SET_COUNTRY_PARAMS,
  SET_COUNTRY_SEARCH,
  TOGGLE_COUNTRIES_LAYER
} from 'constants/action-types';
import {
  ALL_COUNTRY_COLUMNS,
  DEFAULT_COUNTRY_COLUMNS
} from 'constants/countries';
import withTable from './withTable';

const initialState = {
  columns: DEFAULT_COUNTRY_COLUMNS.sites,
  allColumns: ALL_COUNTRY_COLUMNS.sites,
  selected: '',
  selectedCategory: 'sites',
  selectedLASpeciesPopulation: null,
  searchFilter: '',
  geoms: false,
  countries: [],
  filter: '',
  stats: {},
  sites: {},
  criticalSites: {},
  species: {},
  populations: {},
  lookAlikeSpecies: {},
  lookAlikeSpeciesPopulation: {},
  layers: {
    sites: true
  },
  sort: {
    field: '',
    order: ''
  },
  columnFilter: {}
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRY_PARAMS: {
      const category = action.payload.category;

      const params = {
        selected: action.payload.country,
        selectedCategory: category,
        selectedLASpeciesPopulation: category === 'lookAlikeSpeciesPopulation' ? action.payload.population : null,
        filter: action.payload.filter,
        columns: DEFAULT_COUNTRY_COLUMNS[category],
        allColumns: ALL_COUNTRY_COLUMNS[category]
      };
      return Object.assign({}, state, params);
    }
    case SET_COUNTRY_SEARCH:
      return Object.assign({}, state, { searchFilter: action.payload });
    case SET_COUNTRY_COLUMN_FILTER:
      return Object.assign({}, state, { columnFilter: action.payload });
    case GET_COUNTRIES_LIST:
      return Object.assign({}, state, { countries: action.payload });
    case GET_COUNTRIES_GEOM:
      return Object.assign({}, state, { geoms: action.payload });
    case GET_COUNTRIES_STATS: {
      const stats = Object.assign({}, state.stats, {});
      stats[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { stats });
    }
    case GET_COUNTRIES_SITES: {
      const sites = Object.assign({}, state.sites, {});
      sites[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { sites });
    }
    case GET_COUNTRIES_CRITICAL_SITES: {
      const criticalSites = Object.assign({}, state.criticalSites, {});
      criticalSites[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { criticalSites });
    }
    case GET_COUNTRIES_SPECIES: {
      const species = Object.assign({}, state.species, {});
      species[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { species });
    }
    case GET_COUNTRIES_POPULATIONS: {
      const populations = Object.assign({}, state.populations, {});
      populations[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { populations });
    }
    case GET_COUNTRIES_SIMILAR_SPECIES: {
      const lookAlikeSpecies = Object.assign({}, state.lookAlikeSpecies, {});
      // append iso3
      lookAlikeSpecies[action.payload.iso] = action.payload.data.map((d) => ({ ...d, iso3: action.payload.iso }));
      return Object.assign({}, state, { lookAlikeSpecies });
    }
    case GET_COUNTRIES_LOOK_ALIKE_SPECIES_POPULATION: {
      const lookAlikeSpeciesPopulation = Object.assign({}, state.lookAlikeSpeciesPopulation, {});
      lookAlikeSpeciesPopulation[action.payload.populationId] = action.payload.data;
      return Object.assign({}, state, { lookAlikeSpeciesPopulation });
    }
    case TOGGLE_COUNTRIES_LAYER: {
      const layers = Object.assign({}, state.layers);
      layers[action.payload] = !layers[action.payload];
      return Object.assign({}, state, { layers });
    }
    default:
      return state;
  }
};

export default withTable('countries', countriesReducer);

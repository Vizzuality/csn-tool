import { GET_COUNTRIES_LIST, GET_COUNTRIES_GEOM, GET_COUNTRIES_SITES,
         GET_COUNTRIES_STATS, GET_COUNTRIES_CRITICAL_SITES, TOGGLE_COUNTRIES_LAYER,
         GET_COUNTRIES_SPECIES, GET_COUNTRIES_POPULATIONS, GET_COUNTRIES_SIMILAR_SPECIES,
         SET_COUNTRY_PARAMS, SET_COUNTRY_SEARCH, SET_COUNTRY_SORT, SET_COUNTRY_COLUMN_FILTER } from 'constants';
import { commonSort } from './common.js';

const initialState = {
  selected: '',
  selectedCategory: 'sites',
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
  layers: {
    sites: true
  },
  sort: {
    field: '',
    order: ''
  },
  columnFilter: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRY_PARAMS: {
      const params = {
        selected: action.payload.country,
        selectedCategory: action.payload.category,
        filter: action.payload.filter
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
      lookAlikeSpecies[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { lookAlikeSpecies });
    }
    case TOGGLE_COUNTRIES_LAYER: {
      const layers = Object.assign({}, state.layers);
      layers[action.payload] = !layers[action.payload];
      return Object.assign({}, state, { layers });
    }

    case SET_COUNTRY_SORT: {
      let list = null;
      let isResource = false;
      if (state.selected && state.selectedCategory) {
        isResource = true;
        list = [...state[state.selectedCategory][state.selected]];
      } else {
        list = [...state.list];
      }
      list.sort(commonSort(action.payload.field, action.payload.order));

      if (isResource) {
        const data = Object.assign({}, state[state.selectedCategory], { [state.selected]: list });
        return Object.assign({}, state, { [state.selectedCategory]: data, sort: action.payload });
      }
      return Object.assign({}, state, { list, sort: action.payload });
    }
    default:
      return state;
  }
}

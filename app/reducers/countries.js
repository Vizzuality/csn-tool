import { GET_COUNTRIES_LIST, GET_COUNTRIES_GEOM, GET_COUNTRIES_SITES,
         GET_COUNTRIES_STATS, GET_COUNTRIES_SITES_OLD, TOGGLE_COUNTRIES_LAYER,
         GET_COUNTRIES_SPECIES, GET_COUNTRIES_POPULATIONS, GET_COUNTRIES_SIMILAR_SPECIES,
         SET_COUNTRY_PARAMS, SET_COUNTRY_SEARCH } from 'constants';

const initialState = {
  selected: '',
  selectedCategory: 'sites',
  searchFilter: '',
  geoms: false,
  countries: [],
  filter: '',
  stats: {},
  sites: {},
  sitesOld: {},
  species: {},
  populations: {},
  lookAlikeSpecies: {},
  layers: {
    sites: true
  }
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
    case GET_COUNTRIES_SITES_OLD: {
      const sitesOld = Object.assign({}, state.sitesOld, {});
      sitesOld[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { sitesOld });
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
    default:
      return state;
  }
}

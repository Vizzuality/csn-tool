import { GET_COUNTRIES_LIST, GET_COUNTRIES_GEOM, GET_COUNTRIES_SITES,
         GET_COUNTRIES_SPECIES, GET_COUNTRIES_POPULATIONS,
         SET_COUNTRY_PARAMS } from 'constants';

const initialState = {
  selected: '',
  selectedCategory: 'sites',
  geoms: false,
  countries: [],
  sites: {},
  species: {},
  populations: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRY_PARAMS: {
      const params = {
        selected: action.payload.country,
        selectedCategory: action.payload.category
      };
      return Object.assign({}, state, params);
    }
    case GET_COUNTRIES_LIST:
      return Object.assign({}, state, { countries: action.payload });
    case GET_COUNTRIES_GEOM:
      return Object.assign({}, state, { geoms: action.payload });
    case GET_COUNTRIES_SITES: {
      const sites = Object.assign({}, state.sites, {});
      sites[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { sites });
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
    default:
      return state;
  }
}

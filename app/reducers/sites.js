import { SET_SITES_PARAMS, GET_SITES_LIST, GET_SITES_SPECIES,
         GET_SITES_POPULATIONS, GET_SITES_HABITATS, GET_SITES_THREATS,
         SET_SITES_SEARCH, SET_VIEW_MODE, GET_SITES_LOCATIONS } from 'constants';

const initialState = {
  selected: '',
  selectedCategory: 'species',
  locations: false,
  list: false,
  species: {},
  populations: {},
  habitats: {},
  threats: {},
  searchFilter: '',
  viewMode: 'map'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SITES_PARAMS: {
      const params = {
        selected: action.payload.site,
        selectedCategory: action.payload.category
      };
      return Object.assign({}, state, params);
    }
    case SET_SITES_SEARCH:
      return Object.assign({}, state, { searchFilter: action.payload });
    case SET_VIEW_MODE:
      return Object.assign({}, state, { viewMode: action.payload });
    case GET_SITES_LOCATIONS:
      return Object.assign({}, state, { locations: action.payload });
    case GET_SITES_LIST:
      return Object.assign({}, state, { list: action.payload });
    case GET_SITES_SPECIES: {
      const data = Object.assign({}, state.species, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { species: data });
    }
    case GET_SITES_POPULATIONS: {
      const data = Object.assign({}, state.populations, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { populations: data });
    }
    case GET_SITES_HABITATS: {
      const data = Object.assign({}, state.habitats, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { habitats: data });
    }
    case GET_SITES_THREATS: {
      const data = Object.assign({}, state.threats, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { threats: data });
    }
    default:
      return state;
  }
}

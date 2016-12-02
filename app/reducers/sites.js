import { CLEAR_SITES_LIST, SET_SITES_PARAMS, GET_SITES_STATS, GET_SITES_LIST,
         GET_SITES_SPECIES, GET_SITES_POPULATIONS,
         SET_SITES_SEARCH, SET_VIEW_MODE, GET_SITES_LOCATIONS } from 'constants';

const initialState = {
  selected: '',
  selectedCategory: 'species',
  locations: false,
  list: false,
  stats: {},
  species: {},
  populations: {},
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
    case GET_SITES_STATS:
      return Object.assign({}, state, { stats: action.payload });
    case CLEAR_SITES_LIST:
      return Object.assign({}, state, { list: false });
    case GET_SITES_LIST: {
      if (!state.list) {
        return Object.assign({}, state, { list: action.payload.data });
      } else if (action.payload.search) {
        const newState = Object.assign({}, state);
        newState.list = action.payload.data;
        return newState;
      }
      // concat with the new page results
      const list = [...state.list, ...action.payload.data];
      return Object.assign({}, state, { list });
    }
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
    default:
      return state;
  }
}

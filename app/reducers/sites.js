import { CLEAR_SITES_LIST, SET_SITES_PARAMS, GET_SITES_STATS, GET_SITES_LIST,
         GET_SITES_SPECIES, GET_SITES_POPULATIONS,
         SET_SITES_SEARCH, SET_VIEW_MODE, GET_SITES_LOCATIONS } from 'constants';
import { RESULTS_PER_PAGE } from 'constants/config';

const initialState = {
  selected: '',
  selectedCategory: 'species',
  locations: false,
  list: {
    page: 0,
    search: '',
    data: false,
    hasMore: false
  },
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
      const newList = Object.assign({}, state.list);
      newList.page = action.payload.page;
      newList.search = action.payload.search || '';
      newList.hasMore = action.payload.data.length === RESULTS_PER_PAGE;
      if (action.payload.page === 0) {
        newList.data = action.payload.data;
      } else {
        // concat with the new page results
        newList.data = [...newList.data, ...action.payload.data];
      }
      return Object.assign({}, state, { list: newList });
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

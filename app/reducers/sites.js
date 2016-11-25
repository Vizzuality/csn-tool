import { SET_SITES_PARAMS, GET_SITES_LIST, GET_SITES_SPECIES, GET_SITES_THREATS, SET_SITES_SEARCH } from 'constants';

const initialState = {
  selected: '',
  selectedCategory: 'species',
  list: false,
  species: {},
  threats: {},
  searchFilter: ''
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
    case GET_SITES_LIST:
      return Object.assign({}, state, { list: action.payload });
    case GET_SITES_SPECIES: {
      const data = Object.assign({}, state.species, {});
      data[action.payload.slug] = action.payload.data;
      return Object.assign({}, state, { species: data });
    }
    case GET_SITES_THREATS: {
      const data = Object.assign({}, state.threats, {});
      data[action.payload.slug] = action.payload.data;
      return Object.assign({}, state, { threats: data });
    }
    default:
      return state;
  }
}

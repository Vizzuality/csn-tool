import { GET_SPECIES_LIST, GET_SPECIES_SITES, GET_SPECIES_POPULATION,
  GET_SPECIES_THREATS, GET_SPECIES_HABITATS, SET_SPECIES_DETAIL_PARAMS,
  SET_SPECIES_DETAIL_SEARCH } from 'constants';

const initialState = {
  list: false,
  selectedCategory: 'sites',
  searchFilter: '',
  sites: {},
  population: {},
  threats: {},
  habitats: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SPECIES_DETAIL_PARAMS: {
      const params = {
        selected: action.payload.id,
        selectedCategory: action.payload.category
      };
      return Object.assign({}, state, params);
    }
    case SET_SPECIES_DETAIL_SEARCH:
      return Object.assign({}, state, { searchFilter: action.payload });
    case GET_SPECIES_LIST:
      return Object.assign({}, state, { list: action.payload });
    case GET_SPECIES_SITES: {
      const data = Object.assign({}, state.sites, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { sites: data });
    }
    case GET_SPECIES_POPULATION: {
      const data = Object.assign({}, state.population, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { population: data });
    }
    case GET_SPECIES_THREATS: {
      const data = Object.assign({}, state.threats, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { threats: data });
    }
    case GET_SPECIES_HABITATS: {
      const data = Object.assign({}, state.habitats, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { habitats: data });
    }
    default:
      return state;
  }
}

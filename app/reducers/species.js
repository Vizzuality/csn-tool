import { GET_SPECIES_LIST, GET_SPECIES_DATA } from 'constants';

const initialState = {
  list: false,
  sites: {},
  population: {},
  threats: {},
  habitats: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPECIES_LIST:
      return Object.assign({}, state, { list: action.payload });
    case GET_SPECIES_DATA: {
      const data = Object.assign({}, state.sites, {});
      data[action.payload.slug] = action.payload.data;
      return Object.assign({}, state, { sites: data });
    }
    default:
      return state;
  }
}

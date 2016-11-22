import { GET_SPECIES_LIST, GET_SPECIES_DATA } from 'constants';

const initialState = {
  list: false,
  data: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPECIES_LIST:
      return Object.assign({}, state, { list: action.payload });
    case GET_SPECIES_DATA: {
      const data = Object.assign({}, state.data, {});
      data[action.payload.slug] = action.payload.data;
      return Object.assign({}, state, { data });
    }
    default:
      return state;
  }
}

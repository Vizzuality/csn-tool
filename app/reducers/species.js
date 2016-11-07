import { GET_SPECIES_LIST, GET_SPECIES_DATA } from 'constants';

const initialState = {
  speciesList: [],
  speciesData: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPECIES_LIST:
      return Object.assign({}, state, { speciesList: action.payload });
    case GET_SPECIES_DATA: {
      const speciesData = Object.assign({}, state.speciesData, {});
      speciesData[action.payload.slug] = action.payload.data;
      return Object.assign({}, state, { speciesData });
    }
    default:
      return state;
  }
}

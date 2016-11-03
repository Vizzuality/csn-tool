import { GET_SPECIES_LIST } from 'constants';

const initialState = {
  speciesList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPECIES_LIST:
      return Object.assign({}, state, { speciesList: action.payload });
    default:
      return state;
  }
}

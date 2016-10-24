import { GET_COUNTRIES_LIST } from 'constants';

const initialState = {
  countriesList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES_LIST:
      return Object.assign({}, state, { countriesList: action.payload });
    default:
      return state;
  }
}

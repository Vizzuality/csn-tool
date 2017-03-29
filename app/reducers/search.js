import { GET_SEARCH_OPTIONS, GET_SEARCH_RESULTS } from 'constants';

const initialState = {
  options: null,
  results: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_OPTIONS:
      return Object.assign({}, state, { options: action.payload });
    case GET_SEARCH_RESULTS:
      return Object.assign({}, state, { results: action.payload });
    default:
      return state;
  }
}

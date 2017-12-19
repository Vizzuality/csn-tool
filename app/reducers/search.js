import {
  GET_SEARCH_OPTIONS,
  GET_SEARCH_RESULTS,
  SET_SEARCH_FILTER,
  SET_SPECIES_COLUMN_FILTER,
  BEFORE_GET_SEARCH_RESULTS
} from 'constants/action-types';

const initialState = {
  options: null,
  results: null,
  search: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_OPTIONS:
      return Object.assign({}, state, { options: action.payload });
    case BEFORE_GET_SEARCH_RESULTS:
      return Object.assign({}, state, { results: {}, columnFilter: {} });
    case GET_SEARCH_RESULTS:
      return Object.assign({}, state, { results: action.payload, search: false });
    case SET_SEARCH_FILTER:
      return Object.assign({}, state, { search: action.payload.search });
    case SET_SPECIES_COLUMN_FILTER:
      return Object.assign({}, state, { columnFilter: action.payload });
    default:
      return state;
  }
}

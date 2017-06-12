import {
  GET_SEARCH_OPTIONS,
  GET_SEARCH_RESULTS,
  SET_SEARCH_FILTER,
  SET_SPECIES_SORT,
  SET_SPECIES_COLUMN_FILTER,
  BEFORE_GET_SEARCH_RESULTS
} from 'constants';
import { commonSort } from './common.js';

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
    case SET_SPECIES_SORT: {
      const results = Object.assign({}, state.results);
      let sorted = false;
      if (state.results && state.results.rows) {
        results.rows.sort(commonSort(action.payload.field, action.payload.order));
        sorted = true;
      }
      return sorted ? Object.assign({}, state, results) : state;
    }
    case SET_SPECIES_COLUMN_FILTER:
      return Object.assign({}, state, { columnFilter: action.payload });
    default:
      return state;
  }
}

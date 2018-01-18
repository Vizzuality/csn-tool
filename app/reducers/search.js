import {
  GET_SEARCH_OPTIONS,
  GET_SEARCH_RESULTS,
  BEFORE_GET_SEARCH_RESULTS
} from 'constants/action-types';
import {
  SEARCH_COLUMNS,
  TABLES
} from 'constants/tables';

import withTable from './withTable';

const initialState = {
  columns: [],
  allColumns: [],
  options: null,
  list: false,
  isFetching: false,
  searchFilter: '',
  sort: {
    field: '',
    order: ''
  }
};

function getColumns(selectedCategory) {
  return SEARCH_COLUMNS[selectedCategory] || {
    columns: [],
    allColumns: []
  };
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_OPTIONS:
      return { ...state, options: action.payload };
    case BEFORE_GET_SEARCH_RESULTS:
      return { ...state, list: false, isFetching: true, columnFilter: {} };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        ...getColumns(action.payload.category),
        list: action.payload.data.rows,
        selectedCategory: action.payload.category,
        searchFilter: '',
        isFetching: false
      };
    default:
      return state;
  }
};

export default withTable(TABLES.SEARCH, searchReducer);

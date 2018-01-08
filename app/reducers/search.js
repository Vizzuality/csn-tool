import {
  GET_SEARCH_OPTIONS,
  GET_SEARCH_RESULTS,
  BEFORE_GET_SEARCH_RESULTS
} from 'constants/action-types';
import {
  ALL_SITES_COLUMNS,
  ALL_SPECIES_COLUMNS,
  DEFAULT_SITES_COLUMNS,
  DEFAULT_SPECIES_COLUMNS,
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

const COLUMNS = {
  species: {
    columns: DEFAULT_SPECIES_COLUMNS.over,
    allColumns: ALL_SPECIES_COLUMNS.over
  },
  ibas: {
    columns: DEFAULT_SITES_COLUMNS.iba,
    allColumns: ALL_SITES_COLUMNS.iba
  },
  criticalSites: {
    columns: DEFAULT_SITES_COLUMNS.csn,
    allColumns: ALL_SITES_COLUMNS.csn
  },
  populations: {
    columns: DEFAULT_SPECIES_COLUMNS.population,
    allColumns: ALL_SPECIES_COLUMNS.population
  }
};

function getColumns(selectedCategory) {
  return COLUMNS[selectedCategory] || {
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

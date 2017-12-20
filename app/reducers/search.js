import {
  GET_SEARCH_OPTIONS,
  GET_SEARCH_RESULTS,
  SET_SEARCH_FILTER,
  SET_SPECIES_COLUMN_FILTER,
  BEFORE_GET_SEARCH_RESULTS
} from 'constants/action-types';
import {
  ALL_SPECIES_COLUMNS,
  DEFAULT_SPECIES_COLUMNS
} from 'constants/species';
import {
  ALL_SITES_COLUMNS,
  DEFAULT_SITES_COLUMNS
} from 'constants/sites';

import withTable from './withTable';

const initialState = {
  columns: [],
  allColumns: [],
  options: null,
  list: [],
  search: false,
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
      return { ...state, list: [], columnFilter: {} };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        ...getColumns(action.payload.category),
        list: action.payload.data.rows,
        selectedCategory: action.payload.category,
        search: false
      };
    case SET_SEARCH_FILTER:
      return { ...state, search: action.payload.search };
    case SET_SPECIES_COLUMN_FILTER:
      return { ...state, columnFilter: action.payload };
    default:
      return state;
  }
};

export default withTable('search', searchReducer);

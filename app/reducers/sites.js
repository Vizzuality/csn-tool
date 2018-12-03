import {
  CLEAR_SITES_LIST,
  GET_SITES_LIST,
  GET_SITES_LOCATIONS,
  GET_SITES_SPECIES,
  GET_SITES_VULNERABILITY,
  GET_SITES_STATS,
  SET_SITES_PARAMS,
  SET_VIEW_MODE,
  TOGGLE_SITES_LAYER
} from 'constants/action-types';
import {
  ALL_SITES_COLUMNS,
  DEFAULT_SITES_COLUMNS,
  TABLES
} from 'constants/tables';
import { RESULTS_PER_PAGE } from 'constants/config';
import withTable from './withTable';
import { toggleLayer } from './common';

const initialState = {
  columns: DEFAULT_SITES_COLUMNS.iba,
  allColumns: ALL_SITES_COLUMNS.iba,
  selected: '',
  selectedCategory: 'species',
  locations: [],
  list: {
    page: 0,
    search: '',
    data: false,
    hasMore: false
  },
  layers: {
    freshwaterFlowPresent: false,
    freshwaterFlow2050: false,
    inundationPresent: false,
    inundation2050: false
  },
  filter: 'iba',
  stats: {},
  species: {},
  populations: {},
  searchFilter: '',
  viewMode: 'map',
  sort: {
    field: '',
    order: ''
  },
  columnFilter: {},
  type: 'iba',
  csnVulnerability: {}
};

const sitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SITES_PARAMS: {
      const columnsSelector = action.payload.category === 'species' ? `${action.payload.type}Species` : action.payload.category;
      const params = {
        selected: action.payload.site,
        selectedCategory: action.payload.category,
        filter: action.payload.filter,
        type: action.payload.type,
        columns: DEFAULT_SITES_COLUMNS[action.payload.filter || columnsSelector],
        allColumns: ALL_SITES_COLUMNS[action.payload.filter || columnsSelector]
      };
      if (state.selected !== params.selected) {
        params.stats = {};
      }
      return Object.assign({}, state, params);
    }
    case SET_VIEW_MODE:
      return Object.assign({}, state, { viewMode: action.payload });
    case GET_SITES_LOCATIONS:
      return Object.assign({}, state, { locations: action.payload });
    case GET_SITES_STATS:
      return Object.assign({}, state, { stats: action.payload });
    case CLEAR_SITES_LIST: {
      const list = {
        page: 0,
        search: '',
        data: false,
        hasMore: false
      };
      return Object.assign({}, state, { list });
    }
    case GET_SITES_LIST: {
      const newList = Object.assign({}, state.list);
      newList.page = action.payload.page;
      newList.search = action.payload.search || '';
      newList.hasMore = action.payload.data.length === RESULTS_PER_PAGE;
      if (action.payload.page === 0) {
        newList.data = action.payload.data;
      } else {
        // concat with the new page results
        newList.data = [...newList.data, ...action.payload.data];
      }
      return Object.assign({}, state, { list: newList });
    }
    case GET_SITES_SPECIES: {
      const data = Object.assign({}, state.species, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { species: data });
    }
    case GET_SITES_VULNERABILITY: {
      const data = Object.assign({}, state.csnVulnerability, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { csnVulnerability: data });
    }
    case TOGGLE_SITES_LAYER: return toggleLayer(state, action);
    default:
      return state;
  }
};

export default withTable(TABLES.SITES, sitesReducer);

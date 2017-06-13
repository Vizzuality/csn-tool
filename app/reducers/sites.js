import { CLEAR_SITES_LIST, SET_SITES_PARAMS, GET_SITES_STATS, GET_SITES_LIST,
         GET_SITES_SPECIES, SET_SITES_SORT, CHANGE_COLUMN_ACTIVATION,
         SET_SITES_SEARCH, SET_VIEW_MODE, GET_SITES_LOCATIONS, SET_SITES_COLUMN_FILTER } from 'constants';
import { RESULTS_PER_PAGE } from 'constants/config';
import { commonSort } from './common.js';

const SITES_COLUMNS = {
  csn: ['country', 'csn_name', 'protected', 'csn', 'total_percentage'],
  iba: ['country', 'site_name', 'protected', 'iba_species', 'iba_in_danger'],
  species: ['scientific_name', 'english_name', 'iucn_category', 'season', 'start',
    'end', 'minimum', 'maximum', 'geometric_mean', 'units', 'iba_criteria']
};

const initialState = {
  columns: SITES_COLUMNS.iba,
  allColumns: SITES_COLUMNS.iba,
  selected: '',
  selectedCategory: 'species',
  locations: false,
  list: {
    page: 0,
    search: '',
    data: false,
    hasMore: false
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
  type: 'iba'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLUMN_ACTIVATION: {
      const columns = state.columns.slice();
      let newColumns = columns.filter((col) => col !== action.payload);
      if (columns.length === newColumns.length) {
        newColumns.push(action.payload);
        const prevColumns = state.allColumns.slice();
        newColumns = prevColumns.reduce((previous, currentItem) => {
          const isIn = newColumns.some((newCol) => newCol === currentItem);
          if (isIn) previous.push(currentItem);
          return previous;
        }, []);
      }
      return Object.assign({}, state, { columns: newColumns });
    }
    case SET_SITES_PARAMS: {
      console.log(action);

      const params = {
        selected: action.payload.site,
        selectedCategory: action.payload.category,
        filter: action.payload.filter,
        type: action.payload.type,
        columns: SITES_COLUMNS[action.payload.filter || action.payload.category],
        allColumns: SITES_COLUMNS[action.payload.filter || action.payload.category]

      };
      return Object.assign({}, state, params);
    }
    case SET_SITES_SEARCH:
      return Object.assign({}, state, { searchFilter: action.payload });
    case SET_SITES_COLUMN_FILTER:
      return Object.assign({}, state, { columnFilter: action.payload });
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
    case SET_SITES_SORT: {
      let list = null;
      let isResource = false;
      if (state.selected && state.selectedCategory) {
        isResource = true;
        list = [...state[state.selectedCategory][state.selected].data];
      } else {
        list = [...state.list.data];
      }
      list.sort(commonSort(action.payload.field, action.payload.order));

      if (isResource) {
        const newData = {
          [state.selected]: {
            site: [...state[state.selectedCategory][state.selected].site],
            data: list
          }
        };
        const data = Object.assign({}, state[state.selectedCategory], newData);
        return Object.assign({}, state, { [state.selectedCategory]: data, sort: action.payload });
      }
      const newList = Object.assign({}, state.list, { data: list });
      return Object.assign({}, state, { list: newList, sort: action.payload });
    }
    default:
      return state;
  }
}

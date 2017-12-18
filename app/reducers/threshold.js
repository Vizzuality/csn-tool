import {
  CHANGE_COLUMN_ACTIVATION,
  SET_THRESHOLD_COLUMN_FILTER,
  SET_THRESHOLD_COLUMN_SORT,
  SET_THRESHOLD_DATA,
  SET_THRESHOLD_POSITION,
  SET_THRESHOLD_SEARCH_FILTER
} from 'constants/action-types';
import {
  DEFAULT_THRESHOLD_COLUMNS,
  ALL_THRESHOLD_COLUMNS
} from 'constants/thresholds';

const initialState = {
  columns: DEFAULT_THRESHOLD_COLUMNS,
  allColumns: ALL_THRESHOLD_COLUMNS,
  coordinates: {
    lat: null,
    lng: null
  },
  data: null,
  searchFilter: null,
  columnFilter: {},
  sort: {
    field: '',
    order: ''
  }
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
    case SET_THRESHOLD_POSITION:
      return Object.assign({}, state, { coordinates: action.payload });
    case SET_THRESHOLD_SEARCH_FILTER:
      return Object.assign({}, state, { searchFilter: action.payload });
    case SET_THRESHOLD_COLUMN_FILTER:
      return Object.assign({}, state, { columnFilter: action.payload });
    case SET_THRESHOLD_DATA:
      return Object.assign({}, state, { data: action.payload });
    case SET_THRESHOLD_COLUMN_SORT: {
      const data = [...state.data];
      const sortOrder = action.payload.order === 'desc' ? -1 : 1;
      data.sort((a, b) => {
        const itemA = a[action.payload.field] ? a[action.payload.field].toString().trim().toUpperCase() : '';
        const itemB = b[action.payload.field] ? b[action.payload.field].toString().trim().toUpperCase() : '';
        if (itemA < itemB) return -1 * sortOrder;
        if (itemA > itemB) return 1 * sortOrder;
        return 0;
      });

      return Object.assign({}, state, { data, sort: action.payload });
    }
    default:
      return state;
  }
}

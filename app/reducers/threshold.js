import {
  SET_THRESHOLD_DATA,
  SET_THRESHOLD_POSITION
} from 'constants/action-types';
import {
  DEFAULT_THRESHOLD_COLUMNS,
  ALL_THRESHOLD_COLUMNS,
  TABLES
} from 'constants/tables';
import withTable from './withTable';

const initialState = {
  columns: DEFAULT_THRESHOLD_COLUMNS,
  allColumns: ALL_THRESHOLD_COLUMNS,
  coordinates: {
    lat: null,
    lng: null
  },
  list: null,
  searchFilter: null,
  columnFilter: {},
  sort: {
    field: '',
    order: ''
  }
};

const thresholdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THRESHOLD_POSITION:
      return Object.assign({}, state, { coordinates: action.payload });
    case SET_THRESHOLD_DATA:
      return Object.assign({}, state, { list: action.payload });
    default:
      return state;
  }
};

export default withTable(TABLES.THRESHOLDS, thresholdReducer);

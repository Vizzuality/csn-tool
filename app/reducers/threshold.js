import {
  SET_THRESHOLD_DATA,
  SET_THRESHOLD_POSITION,
  TOGGLE_THRESHOLD_LAYER
} from 'constants/action-types';
import {
  DEFAULT_THRESHOLD_COLUMNS,
  ALL_THRESHOLD_COLUMNS,
  TABLES
} from 'constants/tables';
import withTable from './withTable';
import { toggleLayer } from './common';

const initialState = {
  columns: DEFAULT_THRESHOLD_COLUMNS,
  allColumns: ALL_THRESHOLD_COLUMNS,
  coordinates: {
    lat: null,
    lng: null
  },
  list: null,
  layers: {
    freshwaterFlowPresent: false,
    freshwaterFlow2050: false,
    inundationPresent: false,
    inundation2050: false
  },
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
    case TOGGLE_THRESHOLD_LAYER: return toggleLayer(state, action);
    default:
      return state;
  }
};

export default withTable(TABLES.THRESHOLDS, thresholdReducer);

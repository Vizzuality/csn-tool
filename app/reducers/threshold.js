import { SET_THRESHOLD_DATA, SET_THRESHOLD_POSITION, SET_THRESHOLD_COLUMN_FILTER } from 'constants';

const initialState = {
  coordinates: {
    lat: null,
    lng: null
  },
  data: null,
  columnFilter: {
    field: '',
    value: ''
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_THRESHOLD_POSITION:
      return Object.assign({}, state, { coordinates: action.payload });
    case SET_THRESHOLD_COLUMN_FILTER:
      return Object.assign({}, state, { columnFilter: action.payload });
    case SET_THRESHOLD_DATA:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;
  }
}

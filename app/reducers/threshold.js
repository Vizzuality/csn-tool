import { SET_THRESHOLD_DATA, SET_THRESHOLD_POSITION, SET_THRESHOLD_SEARCH_FILTER,
   SET_THRESHOLD_COLUMN_SORT, SET_THRESHOLD_COLUMN_FILTER } from 'constants';

const initialState = {
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

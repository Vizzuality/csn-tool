import { SET_SITES_PARAMS, GET_SITES_LIST, GET_SITES_DETAIL } from 'constants';

const initialState = {
  selected: '',
  list: false,
  details: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SITES_PARAMS:
      return Object.assign({}, state, { selected: action.payload });
    case GET_SITES_LIST:
      return Object.assign({}, state, { list: action.payload });
    case GET_SITES_DETAIL: {
      const details = Object.assign({}, state.details, {});
      details[action.payload.slug] = action.payload.data;
      return Object.assign({}, state, { details });
    }
    default:
      return state;
  }
}

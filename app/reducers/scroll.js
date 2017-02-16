import { SET_SCROLL_STATE, SET_SCROLL_LIMIT, GET_FILTERS_HEIGHT } from 'constants';

const initialState = {
  scroll: false,
  scrollLimit: 0,
  filtersHeight: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCROLL_STATE:
      return Object.assign({}, state, { scroll: action.payload });
    case SET_SCROLL_LIMIT:
      return Object.assign({}, state, { scrollLimit: action.payload });
    case GET_FILTERS_HEIGHT:
      return Object.assign({}, state, { filtersHeight: action.payload });
    default:
      return state;
  }
}

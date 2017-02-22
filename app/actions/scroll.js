import { SET_SCROLL_STATE, SET_SCROLL_LIMIT, GET_FILTERS_HEIGHT } from 'constants';

export function setScrollState(bool) {
  return dispatch => {
    dispatch({
      type: SET_SCROLL_STATE,
      payload: bool
    });
  };
}

export function setScrollLimit(pos) {
  return dispatch => {
    dispatch({
      type: SET_SCROLL_LIMIT,
      payload: pos
    });
  };
}

export function getFiltersHeight(height) {
  return dispatch => {
    dispatch({
      type: GET_FILTERS_HEIGHT,
      payload: height
    });
  };
}

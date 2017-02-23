import { SET_SCROLL_STATE } from 'constants';

export function setScrollState(bool) {
  return dispatch => {
    dispatch({
      type: SET_SCROLL_STATE,
      payload: bool
    });
  };
}

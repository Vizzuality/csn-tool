import { SET_THRESHOLD_POSITION, SET_THRESHOLD_COLUMN_SORT, SET_THRESHOLD_DATA,
  SET_THRESHOLD_SEARCH_FILTER, SET_THRESHOLD_COLUMN_FILTER } from 'constants';

export function setLocation(coordinates) {
  return dispatch => {
    dispatch({
      type: SET_THRESHOLD_POSITION,
      payload: coordinates
    });
    const url = `${config.apiHost}/threshold/${coordinates.lat}/${coordinates.lng}`;
    fetch(url)
      .then(res => {
        if (res.ok) return res.json();
        dispatch({
          type: SET_THRESHOLD_DATA,
          payload: []
        });
        throw new Error(res.statusText);
      })
      .then(data => {
        if (data) {
          dispatch({
            type: SET_THRESHOLD_DATA,
            payload: data
          });
        }
      });
  };
}

export function setThresholdTableSort(sort) {
  return {
    type: SET_THRESHOLD_COLUMN_SORT,
    payload: sort
  };
}

export function setThresholdTableFilter(filter) {
  return {
    type: SET_THRESHOLD_SEARCH_FILTER,
    payload: filter
  };
}

export function setThresholdColumnFilter(filter) {
  return {
    type: SET_THRESHOLD_COLUMN_FILTER,
    payload: filter
  };
}

import { SET_THRESHOLD_POSITION, SET_THRESHOLD_DATA, SET_THRESHOLD_COLUMN_FILTER } from 'constants';

export function setLocation(coordinates) {
  return dispatch => {
    dispatch({
      type: SET_THRESHOLD_POSITION,
      payload: coordinates
    });
    // const url = `${config.apiHost}/threshold/${coordinates.lat}/${coordinates.lng}`;
    const url = `${config.apiHost}/species`;
    fetch(url)
      .then(res => {
        if (res.ok) return res.json();
        return new Error();
      })
      .then(data => {
        dispatch({
          type: SET_THRESHOLD_DATA,
          payload: data
        });
      });
  };
}

export function setThresholdTableFilter(filter) {
  return {
    type: SET_THRESHOLD_COLUMN_FILTER,
    payload: filter
  };
}

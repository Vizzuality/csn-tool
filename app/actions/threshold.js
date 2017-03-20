import { SET_THRESHOLD_POSITION, SET_THRESHOLD_DATA, SET_THRESHOLD_COLUMN_FILTER } from 'constants';

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
        throw new Error(res.statusText);
      })
      .then(data => {
        if (data) {
          dispatch({
            type: SET_THRESHOLD_DATA,
            payload: data
          });
        }
      })
      .catch(e => {
        console.warn(e);
        dispatch({
          type: SET_THRESHOLD_DATA,
          payload: []
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

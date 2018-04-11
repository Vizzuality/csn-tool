import {
  SET_SORT,
  SET_COLUMN_FILTER,
  SET_THRESHOLD_DATA,
  SET_THRESHOLD_POSITION,
  SET_SEARCH_FILTER,
  TOGGLE_THRESHOLD_LAYER
} from 'constants/action-types';
import { TABLES } from 'constants/tables';

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
    type: `${SET_SORT}_${TABLES.THRESHOLDS}`,
    payload: sort
  };
}

export function setThresholdTableFilter(filter) {
  return {
    type: `${SET_SEARCH_FILTER}_${TABLES.THRESHOLDS}`,
    payload: filter
  };
}

export function setThresholdColumnFilter(filter) {
  return {
    type: `${SET_COLUMN_FILTER}_${TABLES.THRESHOLDS}`,
    payload: filter
  };
}

export function toggleLayer(layer) {
  return {
    type: TOGGLE_THRESHOLD_LAYER,
    payload: layer
  };
}

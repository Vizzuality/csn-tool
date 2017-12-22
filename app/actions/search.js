import {
  BEFORE_GET_SEARCH_RESULTS,
  GET_SEARCH_OPTIONS,
  GET_SEARCH_RESULTS,
  SET_SEARCH_FILTER,
  SET_SORT
} from 'constants/action-types';
import { TABLES } from 'constants/tables';
import { queryParams } from 'helpers/queryParams';

export function setSearchFilter(search) {
  return {
    type: `${SET_SEARCH_FILTER}_${TABLES.SEARCH}`,
    payload: { search }
  };
}

export function getSearchOptions() {
  const url = `${config.apiHost}/search/options`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SEARCH_OPTIONS,
            payload: data
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SEARCH_OPTIONS,
        payload: {}
      });
    }
  };
}

function getFilterValues(filters) {
  return Object.keys(filters).reduce((result, key) => {
    const value = filters[key];
    result[key] = Array.isArray(value) // eslint-disable-line no-param-reassign
      ? value.map((v) => v.value)
      : value.value;
    return result;
  }, {});
}

export function getSearchResults(category, filters) {
  const params = queryParams(getFilterValues(filters));
  const url = `${config.apiHost}/search/${category}?${params}`;
  return dispatch => {
    try {
      dispatch({
        type: BEFORE_GET_SEARCH_RESULTS
      });
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SEARCH_RESULTS,
            payload: {
              data,
              category
            }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SEARCH_RESULTS,
        payload: {
          data: [],
          category
        }
      });
    }
  };
}

export function setSearchTableSort(sort) {
  return {
    type: `${SET_SORT}_${TABLES.SEARCH}`,
    payload: sort
  };
}

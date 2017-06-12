import { GET_SEARCH_OPTIONS, GET_SEARCH_RESULTS, SET_SEARCH_FILTER } from 'constants';

export function setSearchFilter(search, filter) {
  return {
    type: SET_SEARCH_FILTER,
    payload: { search, filter }
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

export function getSearchResults(category, filters) {
  let params = '';
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      params += `${params ? '&' : '?'}`;
      if (Array.isArray(filters[key]) && filters[key].length > 0) {
        params += `${key}=`;
        filters[key].forEach((filter, index) => {
          params += `${index > 0 ? ',' : ''}${filter.value}`;
        });
      } else {
        params += `${key}=${filters[key].value}`;
      }
    }
  });

  const url = `${config.apiHost}/search/${category}${params}`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SEARCH_RESULTS,
            payload: data
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SEARCH_RESULTS,
        payload: []
      });
    }
  };
}

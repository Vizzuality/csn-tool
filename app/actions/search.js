import { GET_SEARCH_OPTIONS } from 'constants';

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

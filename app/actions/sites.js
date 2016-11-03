import { GET_SITES_LIST } from 'constants';

export function getSitesList() {
  const url = `${config.apiHost}/sites`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SITES_LIST,
          payload: data
        });
      });
  };
}

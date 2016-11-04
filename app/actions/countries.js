import { GET_COUNTRIES_LIST } from 'constants';

export function getCountriesList() {
  const url = `${config.apiHost}/countries`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_COUNTRIES_LIST,
          payload: data
        });
      });
  };
}

import { GET_SPECIES_LIST } from 'constants';

export function getSpeciesList() {
  const url = `${config.apiHost}/species`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_LIST,
          payload: data
        });
      });
  };
}

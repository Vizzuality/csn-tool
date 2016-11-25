import { GET_SPECIES_LIST, GET_SPECIES_DATA } from 'constants';

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

export function getSpeciesSites(slug) {
  const url = `${config.apiHost}/species/${slug}`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_DATA,
          payload: {
            slug,
            data
          }
        });
      });
  };
}

export function getSpeciesPopulation(slug) {
  const url = `${config.apiHost}/species/${slug}`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_DATA,
          payload: {
            slug,
            data
          }
        });
      });
  };
}
export function getSpeciesThreats(slug) {
  const url = `${config.apiHost}/species/${slug}`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_DATA,
          payload: {
            slug,
            data
          }
        });
      });
  };
}
export function getSpeciesHabitats(slug) {
  const url = `${config.apiHost}/species/${slug}`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_DATA,
          payload: {
            slug,
            data
          }
        });
      });
  };
}

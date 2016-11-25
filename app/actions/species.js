import { GET_SPECIES_LIST, GET_SPECIES_SITES, GET_SPECIES_POPULATION, GET_SPECIES_THREATS, GET_SPECIES_HABITATS } from 'constants';

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
          type: GET_SPECIES_SITES,
          payload: {
            slug,
            data
          }
        });
      });
  };
}

export function getSpeciesPopulation(slug) {
  const url = `${config.apiHost}/species/${slug}/population`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_POPULATION,
          payload: {
            slug,
            data
          }
        });
      });
  };
}
export function getSpeciesThreats(slug) {
  const url = `${config.apiHost}/species/${slug}/threats`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_THREATS,
          payload: {
            slug,
            data
          }
        });
      });
  };
}
export function getSpeciesHabitats(slug) {
  const url = `${config.apiHost}/species/${slug}/habitats`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_HABITATS,
          payload: {
            slug,
            data
          }
        });
      });
  };
}

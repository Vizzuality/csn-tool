import { GET_SPECIES_STATS, GET_SPECIES_LIST, GET_SPECIES_SITES, GET_SPECIES_POPULATION,
  GET_SPECIES_THREATS, GET_SPECIES_HABITATS, SET_SPECIES_DETAIL_PARAMS,
  SET_SPECIES_DETAIL_SEARCH } from 'constants';

export function getSpeciesStats(id) {
  const url = `${config.apiHost}/species/${id}/details`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_STATS,
          payload: data
        });
      });
  };
}

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

export function getSpeciesSites(id) {
  const url = `${config.apiHost}/species/${id}`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_SITES,
          payload: {
            id,
            data
          }
        });
      });
  };
}

export function getSpeciesPopulation(id) {
  const url = `${config.apiHost}/species/${id}/population`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_POPULATION,
          payload: {
            id,
            data
          }
        });
      });
  };
}
export function getSpeciesThreats(id) {
  const url = `${config.apiHost}/species/${id}/threats`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_THREATS,
          payload: {
            id,
            data
          }
        });
      });
  };
}
export function getSpeciesHabitats(id) {
  const url = `${config.apiHost}/species/${id}/habitats`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_HABITATS,
          payload: {
            id,
            data
          }
        });
      });
  };
}

export function setSpeciesDetailParams(id, category) {
  return {
    type: SET_SPECIES_DETAIL_PARAMS,
    payload: { id, category }
  };
}

export function setSearchFilter(search) {
  return {
    type: SET_SPECIES_DETAIL_SEARCH,
    payload: search
  };
}

export function resetSearchFilter() {
  return {
    type: SET_SPECIES_DETAIL_SEARCH,
    payload: ''
  };
}

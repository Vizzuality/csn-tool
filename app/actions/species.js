import { GET_SPECIES_STATS, GET_SPECIES_LIST, GET_SPECIES_SITES, GET_SPECIES_POPULATION,
  GET_SPECIES_THREATS, GET_SPECIES_HABITATS, GET_SPECIES_LOOK_ALIKE_SPECIES,
  SET_SPECIES_DETAIL_PARAMS, SET_SPECIES_SORT,
  SET_SPECIES_DETAIL_SEARCH, TOGGLE_SPECIES_LAYER } from 'constants';

export function getSpeciesStats(id) {
  const url = `${config.apiHost}/species/${id}`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SPECIES_STATS,
            payload: data
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SPECIES_STATS,
        payload: []
      });
    }
  };
}

export function getSpeciesList() {
  const url = `${config.apiHost}/species`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SPECIES_LIST,
            payload: data
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SPECIES_LIST,
        payload: []
      });
    }
  };
}

export function getSpeciesSites(id) {
  const url = `${config.apiHost}/species/${id}/sites`;
  return dispatch => {
    try {
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
    } catch (err) {
      const data = [];
      dispatch({
        type: GET_SPECIES_SITES,
        payload: {
          id,
          data
        }
      });
    }
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

export function getSpeciesLookAlikeSpecies(id) {
  const url = `${config.apiHost}/species/${id}/look-alike-species`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_LOOK_ALIKE_SPECIES,
          payload: {
            id,
            data
          }
        });
      });
  };
}

export function setSpeciesTableSort(sort) {
  return {
    type: SET_SPECIES_SORT,
    payload: sort
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

export function toggleLayer(layer) {
  return {
    type: TOGGLE_SPECIES_LAYER,
    payload: layer
  };
}

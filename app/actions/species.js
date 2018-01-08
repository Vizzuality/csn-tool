import {
  GET_SPECIES_CRITICAL_SITES,
  GET_SPECIES_LIST,
  GET_SPECIES_LOOK_ALIKE_SPECIES,
  GET_SPECIES_LOOK_ALIKE_SPECIES_POPULATION,
  GET_SPECIES_POPULATION,
  GET_SPECIES_SITES,
  GET_SPECIES_STATS,
  SELECT_SPECIES_TABLE_ITEM,
  SET_COLUMN_FILTER,
  SET_SEARCH_FILTER,
  SET_SORT,
  SET_SPECIES_DETAIL_PARAMS,
  SET_SPECIES_PARAMS,
  TOGGLE_LEGEND_ITEM,
  TOGGLE_SPECIES_LAYER
} from 'constants/action-types';
import { TABLES } from 'constants/tables';

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

export function getSpeciesCriticalSites(id) {
  const url = `${config.apiHost}/species/${id}/criticalSites`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_CRITICAL_SITES,
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

export function getSpeciesLookAlikeSpeciesPopulation(id, populationId) {
  const url = `${config.apiHost}/species/${id}/look-alike-species/${populationId}`;

  return (dispatch) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SPECIES_LOOK_ALIKE_SPECIES_POPULATION,
          payload: {
            id,
            populationId,
            data
          }
        });
      });
  };
}

export function setSpeciesTableSort(sort) {
  return {
    type: `${SET_SORT}_${TABLES.SPECIES}`,
    payload: sort
  };
}

export function setSpeciesParams(site, category, filter, type) {
  return {
    type: SET_SPECIES_PARAMS,
    payload: { site, category, filter, type }
  };
}

export function setSpeciesDetailParams(id, category, population) {
  return {
    type: SET_SPECIES_DETAIL_PARAMS,
    payload: { id, category, population }
  };
}

export function setSearchFilter(search) {
  return {
    type: `${SET_SEARCH_FILTER}_${TABLES.SPECIES}`,
    payload: search
  };
}

export function resetSearchFilter() {
  return {
    type: `${SET_SEARCH_FILTER}_${TABLES.SPECIES}`,
    payload: ''
  };
}

export function toggleLayer(layer) {
  return {
    type: TOGGLE_SPECIES_LAYER,
    payload: layer
  };
}

export function toggleLegendItem(item, active) {
  return {
    type: TOGGLE_LEGEND_ITEM,
    payload: { id: item.id, active }
  };
}

export function setSpeciesFilter(filter) {
  return {
    type: `${SET_COLUMN_FILTER}_${TABLES.SPECIES}`,
    payload: filter
  };
}

export function selectSpeciesTableItem(item) {
  return {
    type: SELECT_SPECIES_TABLE_ITEM,
    payload: item
  };
}

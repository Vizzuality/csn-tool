import {
  GET_COUNTRIES_CRITICAL_SITES,
  GET_COUNTRIES_GEOM,
  GET_COUNTRIES_LIST,
  GET_COUNTRIES_LOOK_ALIKE_SPECIES_POPULATION,
  GET_COUNTRIES_POPULATIONS,
  GET_COUNTRIES_SIMILAR_SPECIES,
  GET_COUNTRIES_SITES,
  GET_COUNTRIES_SPECIES,
  GET_COUNTRIES_STATS,
  SET_COUNTRY_COLUMN_FILTER,
  SET_COUNTRY_PARAMS,
  SET_COUNTRY_SEARCH,
  SET_SORT,
  TOGGLE_COUNTRIES_LAYER
} from 'constants/action-types';
import { push } from 'react-router-redux';

export function goCountryDetail(iso) {
  return (dispatch, state) => {
    const lang = state().i18nState.lang;
    dispatch(push(`/${lang}/countries/${iso}`));
  };
}

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

export function getCountryStats(iso) {
  const url = `${config.apiHost}/countries/${iso}`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_STATS,
            payload: { iso, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_COUNTRIES_STATS,
        payload: { iso, data: [] }
      });
    }
  };
}

export function getCountrySites(iso) {
  const url = `${config.apiHost}/countries/${iso}/sites`;
  return dispatch => {
    fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch({
          type: GET_COUNTRIES_SITES,
          payload: { iso, data }
        });
      })
      .catch((err) => {
        console.warn(err);
        dispatch({
          type: GET_COUNTRIES_SITES,
          payload: { iso, data: [] }
        });
      });
  };
}

export function getCountryCriticalSites(iso) {
  const url = `${config.apiHost}/countries/${iso}/criticalSites`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_CRITICAL_SITES,
            payload: { iso, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_COUNTRIES_CRITICAL_SITES,
        payload: { iso, data: [] }
      });
    }
  };
}

export function getCountrySpecies(iso) {
  const url = `${config.apiHost}/countries/${iso}/species`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_SPECIES,
            payload: { iso, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_COUNTRIES_SPECIES,
        payload: { iso, data: [] }
      });
    }
  };
}

export function getCountryPopulations(iso) {
  const url = `${config.apiHost}/countries/${iso}/populations`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_POPULATIONS,
            payload: { iso, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_COUNTRIES_POPULATIONS,
        payload: { iso, data: [] }
      });
    }
  };
}

export function getCountryLookAlikeSpecies(iso) {
  const url = `${config.apiHost}/countries/${iso}/look-alike-species`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_SIMILAR_SPECIES,
            payload: { iso, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_COUNTRIES_SIMILAR_SPECIES,
        payload: { iso, data: [] }
      });
    }
  };
}

export function getCountryLookAlikeSpeciesPopulation(iso, populationId) {
  const url = `${config.apiHost}/countries/${iso}/look-alike-species/${populationId}`;

  return (dispatch) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_COUNTRIES_LOOK_ALIKE_SPECIES_POPULATION,
          payload: {
            populationId,
            data
          }
        });
      });
  };
}

export function getCountriesGeom() {
  const url = '/geoms.topojson';
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_COUNTRIES_GEOM,
          payload: data
        });
      });
  };
}

export function setCountryParams(params) {
  return {
    type: SET_COUNTRY_PARAMS,
    payload: {
      country: params.iso,
      category: params.cat,
      filter: params.filter,
      population: params.population
    }
  };
}

export function setSearchFilter(search) {
  return {
    type: SET_COUNTRY_SEARCH,
    payload: search
  };
}

export function toggleLayer(layer) {
  return {
    type: TOGGLE_COUNTRIES_LAYER,
    payload: layer
  };
}

export function setCountriesTableSort(sort) {
  return {
    type: `${SET_SORT}_countries`,
    payload: sort
  };
}

export function setCountriesTableFilter(filter) {
  return {
    type: SET_COUNTRY_COLUMN_FILTER,
    payload: filter
  };
}

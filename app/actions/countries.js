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
  SELECT_TABLE_ITEM,
  SET_COLUMN_FILTER,
  SET_COUNTRY_PARAMS,
  SET_COUNTRY_PRELOAD,
  SET_SEARCH_FILTER,
  SET_COUNTRY_TABLE_COUNTS,
  SET_SORT,
  TOGGLE_COUNTRIES_LAYER,
  TOGGLE_COUNTRIES_LEGEND_ITEM,
  ZOOM_ON_COUNTRY
} from 'constants/action-types';
import { TABLES } from 'constants/tables';
import { push } from 'react-router-redux';

export function goCountryDetail(iso) {
  return (dispatch, state) => {
    const lang = state().i18nState.lang;
    dispatch(push(`/${lang}/countries/${iso}`));
  };
}

export function setCountryPreload(param, status) {
  const data = {};
  data[param] = status;
  return {
    type: SET_COUNTRY_PRELOAD,
    payload: data
  };
}

export function setCountryTableCounts(counts, category) {
  return {
    type: SET_COUNTRY_TABLE_COUNTS,
    payload: { [category]: counts }
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
  return (dispatch, getState) => {
    const category = getState().countries.selectedCategory;
    dispatch(setCountryPreload(category, true));
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
        dispatch(setCountryPreload(category, false));
      })
      .catch((err) => {
        console.warn(err);
        dispatch({
          type: GET_COUNTRIES_SITES,
          payload: { iso, data: [] }
        });
        dispatch(setCountryPreload(category, false));
      });
  };
}

export function getCountryCriticalSites(iso) {
  const url = `${config.apiHost}/countries/${iso}/criticalSites`;
  return (dispatch, getState) => {
    const category = getState().countries.selectedCategory;
    dispatch(setCountryPreload(category, true));
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_CRITICAL_SITES,
            payload: { iso, data }
          });
          dispatch(setCountryPreload(category, false));
        });
    } catch (err) {
      dispatch({
        type: GET_COUNTRIES_CRITICAL_SITES,
        payload: { iso, data: [] }
      });
      dispatch(setCountryPreload(category, false));
    }
  };
}

export function getCountrySpecies(iso) {
  const url = `${config.apiHost}/countries/${iso}/species`;
  return (dispatch, getState) => {
    const category = getState().countries.selectedCategory;
    dispatch(setCountryPreload(category, true));
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_SPECIES,
            payload: { iso, data }
          });
          dispatch(setCountryPreload(category, false));
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
  return (dispatch, getState) => {
    const category = getState().countries.selectedCategory;
    dispatch(setCountryPreload(category, true));
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_POPULATIONS,
            payload: { iso, data }
          });
          dispatch(setCountryPreload(category, false));
        });
    } catch (err) {
      dispatch({
        type: GET_COUNTRIES_POPULATIONS,
        payload: { iso, data: [] }
      });
      dispatch(setCountryPreload(category, false));
    }
  };
}

export function getCountryLookAlikeSpecies(iso, params = { offset: 0, limit: 10 }) {
  let paramrow = '';
  if (params) paramrow = Object.keys(params).map(p => `${p}=${params[p]}`).join('&');
  const url = `${config.apiHost}/countries/${iso}/look-alike-species${paramrow !== '' ? `?${paramrow}` : ''}`;
  return (dispatch, getState) => {
    const category = getState().countries.selectedCategory;
    try {
      dispatch(setCountryPreload(category, true));
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_COUNTRIES_SIMILAR_SPECIES,
            payload: { iso, data }
          });
          dispatch(setCountryPreload(category, false));
        });
    } catch (err) {
      dispatch({
        type: GET_COUNTRIES_SIMILAR_SPECIES,
        payload: { iso, data: [] }
      });
      dispatch(setCountryPreload(category, false));
    }
  };
}

export function getCountryLookAlikeSpeciesCount(iso) {
  const url = `${config.apiHost}/countries/${iso}/look-alike-species-allcount`;
  return (dispatch, getState) => {
    const category = getState().countries.selectedCategory;
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch(setCountryTableCounts(data, category));
        });
    } catch (err) {
      dispatch(setCountryTableCounts(0, category));
    }
  };
}

export function getCountryLookAlikeSpeciesPopulation(iso, populationId) {
  const url = `${config.apiHost}/countries/${iso}/look-alike-species/${populationId}`;

  return (dispatch, getState) => {
    const category = getState().countries.selectedCategory;
    dispatch(setCountryPreload(category, true));
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
        dispatch(setCountryPreload(category, false));
      });
  };
}

export function getCountriesGeom() {
  const url = '/countries-borders-geoms.topojson';
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

export function toggleLayer(layer) {
  return {
    type: TOGGLE_COUNTRIES_LAYER,
    payload: layer
  };
}

export function toggleLegendItem(item, active) {
  return {
    type: TOGGLE_COUNTRIES_LEGEND_ITEM,
    payload: { id: item.id, active }
  };
}

export function setSearchFilter(search) {
  return {
    type: `${SET_SEARCH_FILTER}_${TABLES.COUNTRIES}`,
    payload: search
  };
}

export function setCountriesTableSort(sort) {
  return {
    type: `${SET_SORT}_${TABLES.COUNTRIES}`,
    payload: sort
  };
}

export function setCountriesTableFilter(filter) {
  return {
    type: `${SET_COLUMN_FILTER}_${TABLES.COUNTRIES}`,
    payload: filter
  };
}

export function selectCountriesTableItem(item) {
  return {
    type: `${SELECT_TABLE_ITEM}_${TABLES.COUNTRIES}`,
    payload: item
  };
}

export function zoomOnCountry() {
  return {
    type: ZOOM_ON_COUNTRY
  };
}

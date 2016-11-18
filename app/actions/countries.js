import { GET_COUNTRIES_LIST, GET_COUNTRIES_GEOM, GET_COUNTRIES_SITES,
        GET_COUNTRIES_SPECIES, GET_COUNTRIES_POPULATIONS,
        SET_COUNTRY_SELECTED, SET_COUNTRY_CAT_SELECTED } from 'constants';
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

export function getCountrySites(iso) {
  const url = `${config.apiHost}/countries/${iso}/sites`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_COUNTRIES_SITES,
          payload: { iso, data }
        });
      });
  };
}

export function getCountrySpecies(iso) {
  const url = `${config.apiHost}/countries/${iso}/species`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_COUNTRIES_SPECIES,
          payload: { iso, data }
        });
      });
  };
}

export function getCountryPopulations(iso) {
  const url = `${config.apiHost}/countries/${iso}/populations`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_COUNTRIES_POPULATIONS,
          payload: { iso, data }
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

export function setCountry(country) {
  return {
    type: SET_COUNTRY_SELECTED,
    payload: country
  };
}

export function setCountryCategory(country) {
  return {
    type: SET_COUNTRY_CAT_SELECTED,
    payload: country
  };
}

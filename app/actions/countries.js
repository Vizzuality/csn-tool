import { GET_COUNTRIES_LIST, GET_COUNTRIES_GEO } from 'constants';
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

export function getCountriesGeo() {
  const url = '/countries.geo.json';
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_COUNTRIES_GEO,
          payload: data
        });
      });
  };
}

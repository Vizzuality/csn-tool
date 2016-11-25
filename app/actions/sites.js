import { GET_SITES_LIST, GET_SITES_SPECIES, GET_SITES_THREATS, SET_SITES_PARAMS, SET_SITES_SEARCH } from 'constants';
import { push } from 'react-router-redux';

export function setSiteParams(site, category) {
  return {
    type: SET_SITES_PARAMS,
    payload: { site, category }
  };
}

export function goSiteDetail(slug) {
  return (dispatch, state) => {
    const lang = state().i18nState.lang;
    dispatch(push(`/${lang}/sites/${slug}`));
  };
}

export function getSitesList() {
  const url = `${config.apiHost}/sites`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SITES_LIST,
          payload: data
        });
      });
  };
}

export function getSitesSpecies(slug) {
  const url = `${config.apiHost}/sites/${slug}`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SITES_SPECIES,
            payload: { slug, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SITES_SPECIES,
        payload: { slug, data: [] }
      });
    }
  };
}

export function getSitesThreats(slug) {
  const url = `${config.apiHost}/sites/${slug}/threats`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SITES_THREATS,
            payload: { slug, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SITES_THREATS,
        payload: { slug, data: [] }
      });
    }
  };
}

export function setSearchFilter(search) {
  return {
    type: SET_SITES_SEARCH,
    payload: search
  };
}

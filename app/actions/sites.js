import { GET_SITES_LIST, GET_SITES_DETAIL, SET_SITES_PARAMS } from 'constants';
import { push } from 'react-router-redux';

export function setSiteParams(site) {
  return {
    type: SET_SITES_PARAMS,
    payload: site
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

export function getSitesDetail(slug) {
  const url = `${config.apiHost}/sites/${slug}`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SITES_DETAIL,
            payload: { slug, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SITES_DETAIL,
        payload: { slug, data: [] }
      });
    }
  };
}

import { CLEAR_SITES_LIST, GET_SITES_STATS, GET_SITES_LIST, GET_SITES_SPECIES,
         GET_SITES_POPULATIONS, SET_SITES_PARAMS, SET_SITES_SORT, SET_SITES_COLUMN_FILTER,
         SET_SITES_SEARCH, SET_VIEW_MODE, GET_SITES_LOCATIONS } from 'constants';
import { RESULTS_PER_PAGE } from 'constants/config';
import { push } from 'react-router-redux';

export function setSiteParams(site, category, filter) {
  return {
    type: SET_SITES_PARAMS,
    payload: { site, category, filter }
  };
}

export function goSiteDetail(id) {
  return (dispatch, state) => {
    const lang = state().i18nState.lang;
    dispatch(push(`/${lang}/sites/${id}`));
  };
}

export function clearSites() {
  return {
    type: CLEAR_SITES_LIST,
    payload: { }
  };
}

export function getSitesStats(id) {
  const url = `${config.apiHost}/sites/${id}/details`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SITES_STATS,
          payload: data
        });
      });
  };
}
export function getSitesList(page, search, filter) {
  const searchQuery = search ? `&search=${search}` : '';
  const url = `${config.apiHost}/sites?page=${page}&results=${RESULTS_PER_PAGE}${searchQuery}&filter=${filter}`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SITES_LIST,
          payload: {
            page: page || 0,
            search,
            data
          }
        });
      });
  };
}

export function getSitesLocations(type) {
  const url = `${config.apiHost}/sites/locations/${type}`;
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_SITES_LOCATIONS,
          payload: data
        });
      });
  };
}

export function getSitesSpecies(id) {
  const url = `${config.apiHost}/sites/${id}`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SITES_SPECIES,
            payload: { id, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SITES_SPECIES,
        payload: { id, data: [] }
      });
    }
  };
}

export function getSitesPopulations(id) {
  const url = `${config.apiHost}/sites/${id}/populations`;
  return dispatch => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_SITES_POPULATIONS,
            payload: { id, data }
          });
        });
    } catch (err) {
      dispatch({
        type: GET_SITES_POPULATIONS,
        payload: { id, data: [] }
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

export function resetSearchFilter() {
  return {
    type: SET_SITES_SEARCH,
    payload: ''
  };
}

export function setViewMode(viewMode) {
  return {
    type: SET_VIEW_MODE,
    payload: viewMode
  };
}

export function setSitesTableSort(sort) {
  return {
    type: SET_SITES_SORT,
    payload: sort
  };
}

export function setSitesTableFilter(filter) {
  return {
    type: SET_SITES_COLUMN_FILTER,
    payload: filter
  };
}

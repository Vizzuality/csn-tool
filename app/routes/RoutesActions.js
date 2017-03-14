import dispatch from '../main';
import { setLanguage } from 'redux-i18n';
import { setCountryParams } from 'actions/countries';
import { setSpeciesDetailParams } from 'actions/species';
import { setViewMode, setSiteParams } from 'actions/sites';

export function updateLanguage(actualState, replace, done) {
  dispatch(setLanguage(actualState.params.lang));
  done();
}

function getCountriesParams(state) {
  return {
    iso: state.params.iso || '',
    cat: state.params.cat || 'sites', // defult value
    filter: state.location.query.filter || ''
  };
}

export function setSitesParams(state) {
  const viewMode = state.location.query.viewMode || 'map';
  dispatch(setViewMode(viewMode));
  const siteType = state.params.type || '';
  const site = state.params.site || '';
  const cat = state.params.cat || 'species';
  dispatch(setSiteParams(site, cat));
}

export function setCountriesPage(actualState, replace, done) {
  dispatch(setCountryParams(getCountriesParams(actualState)));
  done();
}

export function updateCountriesPage(prevState, nextState, replace, done) {
  dispatch(setCountryParams(getCountriesParams(nextState)));
  done();
}

export function updateSpeciesDetailPage(actualState, replace, done) {
  const id = actualState.params.id || '';
  const cat = actualState.params.cat || 'sites'; // default value
  dispatch(setSpeciesDetailParams(id, cat));
  done();
}

export function setSitesPage(actualState, replace, done) {
  setSitesParams(actualState);
  done();
}
export function updateSitesPage(actualState, nextState, replace, done) {
  setSitesParams(nextState);
  done();
}

export function updateSitesDetailPage(actualState, replace, done) {
  const site = actualState.params.site || '';
  const cat = actualState.params.cat || 'species'; // default value
  dispatch(setSiteParams(site, cat));
  done();
}

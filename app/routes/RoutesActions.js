import dispatch from '../main';
import { setLanguage } from 'redux-i18n';
import { setCountryParams } from 'actions/countries';
import { setSpeciesDetailParams } from 'actions/species';
import { setSiteParams } from 'actions/sites';

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
  const cat = actualState.params.cat || 'sites'; // defult value
  dispatch(setSpeciesDetailParams(id, cat));
  done();
}

export function updateSitesPage(actualState, replace, done) {
  const site = actualState.params.site || '';
  const cat = actualState.params.cat || 'species'; // defult value
  dispatch(setSiteParams(site, cat));
  done();
}

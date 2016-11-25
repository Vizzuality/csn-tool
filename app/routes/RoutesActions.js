import dispatch from '../main';
import { setLanguage } from 'redux-i18n';
import { setCountryParams } from 'actions/countries';
import { setSpeciesDetailParams } from 'actions/species';
import { setSiteParams } from 'actions/sites';

export function updateLanguage(actualState, replace, done) {
  dispatch(setLanguage(actualState.params.lang));
  done();
}

export function updateCountriesPage(actualState, replace, done) {
  const iso = actualState.params.iso || '';
  const cat = actualState.params.cat || 'sites'; // defult value
  dispatch(setCountryParams(iso, cat));
  done();
}

export function updateSpeciesDetailPage(actualState, replace, done) {
  const slug = actualState.params.slug || '';
  const cat = actualState.params.cat || 'sites'; // defult value
  dispatch(setSpeciesDetailParams(slug, cat));
  done();
}

export function updateSitesPage(actualState, replace, done) {
  const site = actualState.params.site || '';
  const cat = actualState.params.cat || 'species'; // defult value
  dispatch(setSiteParams(site, cat));
  done();
}

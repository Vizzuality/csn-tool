import dispatch from '../main';
import { setLanguage } from 'redux-i18n';
import { setCountryParams } from 'actions/countries';

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

import dispatch from '../main';
import { setLanguage } from 'redux-i18n';
import { setCountry, setCountryCategory } from 'actions/countries';

export function updateLanguage(actualState, replace, done) {
  dispatch(setLanguage(actualState.params.lang));
  done();
}

export function updateCountriesPage(actualState, replace, done) {
  const { iso, cat } = actualState.params;
  if (iso) dispatch(setCountry(iso));
  if (cat) dispatch(setCountryCategory(cat));
  done();
}

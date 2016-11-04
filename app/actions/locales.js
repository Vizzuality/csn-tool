import { push } from 'react-router-redux';
import { setLanguage } from 'redux-i18n';

export function updateURL() {
  return (dispatch, state) => {
    const lang = state().i18nState.lang;
    let pathname = state().routing.locationBeforeTransitions.pathname;
    pathname = pathname !== '/'
      ? pathname.replace(/^\/[a-zA-Z]{2}/g, lang)
      : lang;
    dispatch(push(`/${pathname}`));
  };
}

export function updateLang(lang) {
  return (dispatch) => {
    dispatch(setLanguage(lang));
    dispatch(updateURL());
  };
}

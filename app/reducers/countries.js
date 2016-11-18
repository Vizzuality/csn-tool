import { GET_COUNTRIES_LIST, GET_COUNTRIES_GEOM, GET_COUNTRIES_SITES,
         SET_COUNTRY_SELECTED, SET_COUNTRY_CAT_SELECTED } from 'constants';

const initialState = {
  selectedCountry: false,
  selectedCountryCategory: false,
  countriesGeom: false,
  countriesList: [],
  countrySites: {},
  countrySpecies: {},
  countryPopulations: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRY_SELECTED:
      return Object.assign({}, state, { selectedCountry: action.payload });
    case SET_COUNTRY_CAT_SELECTED:
      return Object.assign({}, state, { selectedCountryCategory: action.payload });
    case GET_COUNTRIES_LIST:
      return Object.assign({}, state, { countriesList: action.payload });
    case GET_COUNTRIES_GEOM:
      return Object.assign({}, state, { countriesGeom: action.payload });
    case GET_COUNTRIES_SITES: {
      const countrySites = Object.assign({}, state.countrySites, {});
      countrySites[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { countrySites });
    }
    default:
      return state;
  }
}

import { GET_COUNTRIES_LIST, GET_COUNTRIES_GEO, GET_COUNTRIES_DETAIL } from 'constants';

const initialState = {
  countriesList: [],
  countriesGeo: {},
  countriesDetail: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES_LIST:
      return Object.assign({}, state, { countriesList: action.payload });
    case GET_COUNTRIES_GEO:
      return Object.assign({}, state, { countriesGeo: action.payload });
    case GET_COUNTRIES_DETAIL: {
      const countriesDetail = Object.assign({}, state.countriesDetail, {});
      countriesDetail[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { countriesDetail });
    }
    default:
      return state;
  }
}

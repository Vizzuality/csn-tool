import { GET_COUNTRIES_LIST, GET_COUNTRIES_GEOM, GET_COUNTRIES_SITES } from 'constants';

const initialState = {
  countriesList: [],
  countriesGeom: false,
  countriesDetail: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES_LIST:
      return Object.assign({}, state, { countriesList: action.payload });
    case GET_COUNTRIES_GEOM:
      return Object.assign({}, state, { countriesGeom: action.payload });
    case GET_COUNTRIES_SITES: {
      const countriesDetail = Object.assign({}, state.countriesDetail, {});
      countriesDetail[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { countriesDetail });
    }
    default:
      return state;
  }
}

import { GET_SITES_LIST } from 'constants';

const initialState = {
  sitesList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SITES_LIST:
      return Object.assign({}, state, { sitesList: action.payload });
    default:
      return state;
  }
}

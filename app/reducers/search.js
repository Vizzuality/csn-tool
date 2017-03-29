import { GET_SEARCH_OPTIONS } from 'constants';

const initialState = {
  options: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_OPTIONS:
      return Object.assign({}, state, { options: action.payload });
    default:
      return state;
  }
}

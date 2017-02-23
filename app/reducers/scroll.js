import { SET_SCROLL_STATE } from 'constants';

const initialState = {
  scroll: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCROLL_STATE:
      return Object.assign({}, state, { scroll: action.payload });
    default:
      return state;
  }
}

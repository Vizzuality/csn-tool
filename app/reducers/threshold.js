import { SET_THRESHOLD_POSITION } from 'constants';

const initialState = {
  latLng: {
    lat: '',
    lng: ''
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_THRESHOLD_POSITION: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}

import { SET_THRESHOLD_POSITION } from 'constants';

export function setLocation(latLng) {
  return {
    type: SET_THRESHOLD_POSITION,
    payload: { latLng }
  };
}

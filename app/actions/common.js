import { CHANGE_COLUMN_ACTIVATION } from 'constants';

export function changeColumnActivation(column) {
  return {
    type: CHANGE_COLUMN_ACTIVATION,
    payload: column
  };
}

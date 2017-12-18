import { CHANGE_COLUMN_ACTIVATION } from 'constants/action-types';

export function changeColumnActivation(column, expanded) {
  return {
    type: CHANGE_COLUMN_ACTIVATION,
    payload: column,
    expanded
  };
}

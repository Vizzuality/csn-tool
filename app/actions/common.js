import { CHANGE_COLUMN_ACTIVATION } from 'constants/action-types';

export function changeColumnActivation(column, tableName) {
  return {
    type: tableName ? `${CHANGE_COLUMN_ACTIVATION}_${tableName}` : CHANGE_COLUMN_ACTIVATION,
    payload: column
  };
}

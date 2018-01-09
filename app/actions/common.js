import {
  CHANGE_COLUMN_ACTIVATION,
  SELECT_TABLE_ITEM
} from 'constants/action-types';

export function changeColumnActivation(column, tableName) {
  return {
    type: tableName ? `${CHANGE_COLUMN_ACTIVATION}_${tableName}` : CHANGE_COLUMN_ACTIVATION,
    payload: column
  };
}

export function selecteTableItem(item) {
  return {
    type: SELECT_TABLE_ITEM,
    payload: item
  };
}

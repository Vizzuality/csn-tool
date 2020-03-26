import { CHANGE_COLUMN_ACTIVATION, SELECT_TABLE_ITEM } from 'constants/action-types';

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

export function commonToggleLayer(item, toggleLayer) {
  return dispatch => {
    if (item.subSections) {
      if (item.active) {
        item.subSections.filter(s => s.active).forEach(section => {
          dispatch(toggleLayer(section.layer));
        });
      } else {
        const firstSection = item.subSections[0];
        if (firstSection) {
          dispatch(toggleLayer(firstSection.layer));
        }
      }
    }

    if (item.layer) {
      dispatch(toggleLayer(item.layer));
    }
  };
}

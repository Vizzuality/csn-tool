import {
  CHANGE_COLUMN_ACTIVATION,
  SET_COLUMN_FILTER,
  SET_SEARCH_FILTER,
  SET_SORT
} from 'constants/action-types';
import { commonSort } from 'reducers/common';

export default function (tableName, reducer) {
  return (prevState, action) => {
    const state = reducer(prevState, action);
    const tableAction = (name) => `${name}_${tableName}`;

    switch (action.type) {
      case tableAction(SET_SEARCH_FILTER):
        return Object.assign({}, state, { searchFilter: action.payload });
      case tableAction(SET_COLUMN_FILTER):
        return Object.assign({}, state, { columnFilter: action.payload });
      case tableAction(CHANGE_COLUMN_ACTIVATION): {
        const columns = state.columns.slice();
        let newColumns = columns.filter((col) => col !== action.payload);

        if (columns.length === newColumns.length) {
          newColumns.push(action.payload);
          const isIn = (col) => newColumns.some((newCol) => newCol === col);
          newColumns = state.allColumns.filter(isIn) || [];
        }

        return {
          ...state,
          columns: newColumns
        };
      }
      case tableAction(SET_SORT): {
        let list = null;
        let isResource = false;
        const id = state.selectedLASpeciesPopulation || state.selected;
        if (state.selected && state.selectedCategory) {
          isResource = true;
          list = [...state[state.selectedCategory][id]];
        } else {
          list = [...state.list];
        }
        list.sort(commonSort(action.payload.field, action.payload.order));

        if (isResource) {
          const data = Object.assign({}, state[state.selectedCategory], { [id]: list });
          return Object.assign({}, state, { [state.selectedCategory]: data, sort: action.payload });
        }
        return Object.assign({}, state, { list, sort: action.payload });
      }
      default:
        return state;
    }
  };
}

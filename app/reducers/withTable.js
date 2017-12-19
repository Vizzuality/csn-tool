import {
  CHANGE_COLUMN_ACTIVATION,
  SET_SORT
} from 'constants/action-types';
import { commonSort } from 'reducers/common';

export default function (name, reducer) {
  return (prevState, action) => {
    const state = reducer(prevState, action);

    switch (action.type) {
      case `${CHANGE_COLUMN_ACTIVATION}_${name}`: {
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
      case `${SET_SORT}_${name}`: {
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

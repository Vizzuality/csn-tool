import {
  CHANGE_COLUMN_ACTIVATION,
  SET_SORT
} from 'constants/action-types';
import { commonSort } from 'reducers/common';

export default function (name, reducer) {
  return (state, action) => {
    const nextState = reducer(state, action);

    switch (action.type) {
      case `${CHANGE_COLUMN_ACTIVATION}_${name}`: {
        const columns = nextState.columns.slice();
        let newColumns = columns.filter((col) => col !== action.payload);

        if (columns.length === newColumns.length) {
          newColumns.push(action.payload);
          const isIn = (col) => newColumns.some((newCol) => newCol === col);
          newColumns = nextState.allColumns.filter(isIn) || [];
        }

        return {
          ...nextState,
          columns: newColumns
        };
      }
      case `${SET_SORT}_${name}`: {
        let list = null;
        let isResource = false;
        const id = nextState.selectedLASpeciesPopulation || nextState.selected;
        if (nextState.selected && nextState.selectedCategory) {
          isResource = true;
          list = [...nextState[nextState.selectedCategory][id]];
        } else {
          list = [...nextState.list];
        }
        list.sort(commonSort(action.payload.field, action.payload.order));

        if (isResource) {
          const data = Object.assign({}, state[nextState.selectedCategory], { [id]: list });
          return Object.assign({}, nextState, { [nextState.selectedCategory]: data, sort: action.payload });
        }
        return Object.assign({}, nextState, { list, sort: action.payload });
      }
      default:
        return nextState;
    }
  };
}

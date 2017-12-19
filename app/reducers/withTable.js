import {
  CHANGE_COLUMN_ACTIVATION
} from 'constants/action-types';

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
      default:
        return nextState;
    }
  };
}

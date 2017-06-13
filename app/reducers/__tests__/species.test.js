/* global expect, jest */
import reducer from 'reducers/species';
import { CHANGE_COLUMN_ACTIVATION } from 'constants/index.js';

const initialState = {
  allColumns: ['scientific_name', 'english_name', 'population', 'genus', 'family'],
  columns: ['scientific_name', 'english_name', 'population', 'genus', 'family'],
  list: false,
  selected: '',
  selectedCategory: 'sites',
  searchFilter: '',
  stats: {},
  sites: {},
  population: {},
  lookAlikeSpecies: {},
  layers: {
    sites: true,
    population: true
  },
  sort: {
    field: '',
    order: ''
  },
  columnFilter: {}
};

describe('reducers', () => {
  describe('species reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, { type: null })
      ).toEqual(initialState);
    });

    it('should change filter activation', () => {
      const scientificName = 'scientific_name';
      const removeColumn = reducer(undefined, { type: CHANGE_COLUMN_ACTIVATION, payload: scientificName });
      expect(removeColumn.columns.some((col) => col === scientificName)).toEqual(false);
    });
  });
});

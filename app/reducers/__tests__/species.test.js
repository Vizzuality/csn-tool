/* global expect, jest */
import reducer from 'reducers/species';
import { CHANGE_COLUMN_ACTIVATION } from 'constants/index.js';

const initialState = {
  activeBounds: [],
  allColumns: ['scientific_name', 'english_name', 'genus', 'family', 'iucn_category', 'aewa_annex_2'],
  columns: ['scientific_name', 'genus', 'family', 'iucn_category', 'aewa_annex_2'],
  expandedColumns: ['scientific_name', 'population', 'a', 'b', 'c'],
  allExpandedColumns: ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'],
  list: false,
  selected: '',
  selectedCategory: 'sites',
  searchFilter: '',
  stats: {},
  sites: {},
  criticalSites: {},
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

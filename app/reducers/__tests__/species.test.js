/* global expect, jest */
import reducer from 'reducers/species';

const initialState = {
  allColumns: ['scientific_name', 'english_name', 'genus', 'family', 'iucn_category', 'aewa_annex_2'],
  columns: ['scientific_name', 'genus', 'family', 'iucn_category', 'aewa_annex_2'],
  list: false,
  selected: '',
  selectedCategory: 'sites',
  searchFilter: '',
  stats: {},
  sites: {},
  criticalSites: {},
  population: {},
  lookAlikeSpecies: {},
  lookAlikeSpeciesPopulation: {},
  highlightedPopulationId: null,
  selectedLASpeciesPopulation: null,
  selectedTableItem: null,
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
  });
});

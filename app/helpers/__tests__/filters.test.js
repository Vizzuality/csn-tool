/* global expect, jest */
import { filterByColumns } from 'helpers/filters';

function setup() {
  const data = [
    { a: '1c', b: '', c: null },
    { a: '1a', b: '', c: null },
    { a: '1a', b: '', c: null },
    { a: '1a 1b', b: '', c: null }
  ];

  const activeFilters = {
    a: JSON.stringify(['1c'])
  };

  return {
    data,
    activeFilters
  };
}

describe('helpers', () => {
  describe('filters', () => {
    it('should filter', () => {
      const { data, activeFilters } = setup();
      expect(filterByColumns(data, activeFilters)).toEqual([{ a: '1c', b: '', c: null }]);
    });

    it('should filter by multiple filters on a single column', () => {
      const { data, activeFilters } = setup();
      activeFilters.a = JSON.stringify(['1a', '1c']);
      expect(filterByColumns(data, activeFilters)).toEqual(data);
    });

    it('should correctly filter "1a 1c"', () => {
      const { data } = setup();
      const activeFilters = {
        a: JSON.stringify(['1b'])
      };
      expect(filterByColumns(data, activeFilters)).toEqual([{ a: '1a 1b', b: '', c: null }]);
    });

    it('should filter any values', () => {
      const data = [
        { a: '', b: '1', c: '' },
        { a: '', b: null, c: null },
        { a: '1a', b: '', c: null }
      ];
      const expectedData = [
        { a: '', b: '1', c: '' },
        { a: '1a', b: '', c: null }
      ];
      const activeFilters = {
        a: 'any',
        b: 'any',
        c: 'any'
      };
      expect(filterByColumns(data, activeFilters)).toEqual(expectedData);
    });
  });
});

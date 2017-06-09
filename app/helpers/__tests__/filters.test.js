/* global expect, jest */
import { filterByColumns } from 'helpers/filters';

function setup() {
  const data = [
    { a: '1c', b: '', c: null },
    { a: '1a', b: '', c: null },
    { a: '1a', b: '', c: null }
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
  });
});

/* global expect, jest */

import { mount } from 'enzyme';
import React from 'react';
import CSVButton from 'components/tables/CSVButton';

window.URL.createObjectURL = () => 'blob:';

const setup = ({ data, columns } = {}) => {
  const props = {
    data: data || [],
    columns: columns || ['country', 'iba_name']
  };
  const enzymeWrapper = mount(
    <CSVButton {...props} />,
    { context: { t: jest.fn() } }
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('CSVButton', () => {
    it('should render', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('a').length).toBeGreaterThan(0);
    });

    it('should display blob url when data provided', () => {
      const { enzymeWrapper } = setup({
        data: [{
          country: 'Poland',
          iba_name: 'Bzura River Valley'
        }],
        columns: ['country', 'iba_name']
      });
      const href = enzymeWrapper.find('a').get(0).getAttribute('href');
      expect(href.startsWith('blob:')).toBe(true);
    });

    it('should not display blob url when data function provided', () => {
      const { enzymeWrapper } = setup({
        data: jest.fn(),
        columns: ['country', 'iba_name']
      });
      const href = enzymeWrapper.find('a').get(0).getAttribute('href');
      expect(href).toEqual('#');
    });

    it('should load data on click when data function provided', () => {
      const loadData = jest.fn();
      loadData.mockReturnValue(Promise.resolve([]));
      const { enzymeWrapper } = setup({
        data: loadData,
        columns: ['country', 'iba_name']
      });
      enzymeWrapper.simulate('click');
      expect(loadData.mock.calls.length).toBe(1);
    });
  });
});

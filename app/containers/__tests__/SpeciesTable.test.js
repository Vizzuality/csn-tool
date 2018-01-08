/* global expect, jest */
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import SpeciesTable from 'containers/species/SpeciesTable';
import SpeciesTableComponent from 'components/species/SpeciesTable';
import { StickyContainer } from 'react-sticky';

const setup = (newStore) => {
  const state = newStore || {
    species: {
      filter: {},
      allColumns: ['scientific_name', 'english_name', 'population', 'genus', 'family'],
      columns: ['scientific_name', 'english_name', 'population', 'genus', 'family'],
      list: [
        { scientific_name: 'Albania' },
        { scientific_name: 'England' }
      ]
    }
  };

  const store = {
    default: () => {},
    subscribe: () => {},
    dispatch: () => {},
    getState: () => (
      { ...state }
    )
  };

  const enzymeWrapper = mount(
    <Provider store={store}>
      <StickyContainer>
        <SpeciesTable />
      </StickyContainer>
    </Provider>, {
      context: { t: jest.fn() },
      childContextTypes: {
        t: PropTypes.func
      }
    }
  );

  return {
    state,
    store,
    enzymeWrapper
  };
};

describe('containers', () => {
  describe('SpeciesTable', () => {
    it('should render', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('#speciesTable').length).toBeGreaterThan(0);
    });

    it('should display columns', () => {
      const { enzymeWrapper, state } = setup();
      const col = 3;

      expect(enzymeWrapper.find('#table-rows').first()
        .find('.text')
        .at(col)
        .hasClass(state.species.columns[col])
      ).toBe(true);
    });

    it('should filter search results when the filter is empty', () => {
      const { enzymeWrapper, state } = setup();
      expect(enzymeWrapper.find(SpeciesTableComponent).props().data).toEqual(state.species.list);
    });
  });
});

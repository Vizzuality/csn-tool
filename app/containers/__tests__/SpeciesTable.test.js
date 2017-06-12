/* global expect, jest */
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import SpeciesTable from 'containers/species/SpeciesTable';
import SpeciesTableComponent from 'components/species/SpeciesTable';
import { StickyContainer } from 'react-sticky';

// jest.mock('react-sticky');

const setup = (newStore) => {
  const standard = {
    filter: {},
    list: {
      data: [
        { scientific_name: 'Albania' },
        { scientific_name: 'England' }
      ]
    }
  };

  const state = newStore || {
    species: standard,
    sort: {},
    search: {
      results: {
        rows: standard.list.data,
        sites: []
      },
      options: {}
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
        t: React.PropTypes.func
      }
    }
  );

  return {
    state,
    store,
    enzymeWrapper,
    standard
  };
};

describe('containers', () => {
  describe('SpeciesTable', () => {
    it('should render', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('#speciesTable').length).toBeGreaterThan(0);
    });

    it('should filter search results when the filter is empty', () => {
      const { enzymeWrapper, standard } = setup();
      expect(enzymeWrapper.find(SpeciesTableComponent).props().data).toEqual(standard.list.data);
    });

    it('should filter search results by search filter', () => {
      const { state } = setup();
      state.search.search = 'En';
      const { enzymeWrapper } = setup(state);
      expect(enzymeWrapper.find(SpeciesTableComponent).props().data)
        .toEqual([{ scientific_name: '<span class="filtered">en</span>gland' }]);
    });
  });
});

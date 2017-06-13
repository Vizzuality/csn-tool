/* global expect, jest */
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import SitesTable from 'containers/sites/SitesTable';
import SitesTableComponent from 'components/sites/SitesTable';

// jest.mock('react-sticky');

const setup = () => {
  const standard = {
    filter: {},
    allColumns: ['country', 'english_name', 'population', 'genus', 'family'],
    columns: ['country', 'english_name', 'population', 'genus', 'family'],
    list: {
      data: [
        { country: 'Albania' },
        { country: 'England' }
      ]
    }
  };

  const state = {
    sites: standard,
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
      <SitesTable />
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
  describe('SitesTable', () => {
    it('should render', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('#sitesTable').length).toBeGreaterThan(0);
    });

    it('should filter search results when the filter is empty', () => {
      const { enzymeWrapper, standard } = setup();
      expect(enzymeWrapper.find(SitesTableComponent).props().list.data).toEqual(standard.list.data);
    });

    it('should filter search results by search filter', () => {
      const { state, store } = setup();
      state.search.search = 'En';
      const enzymeWrapper = mount(
        <Provider store={store}>
          <SitesTable />
        </Provider>, {
          context: { t: jest.fn() },
          childContextTypes: {
            t: React.PropTypes.func
          }
        }
      );
      expect(enzymeWrapper.find(SitesTableComponent).props().list.data)
        .toEqual([{ country: '<span class="filtered">en</span>gland' }]);
    });
  });
});

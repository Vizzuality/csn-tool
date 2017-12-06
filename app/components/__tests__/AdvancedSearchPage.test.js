/* global expect, jest */
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AdvancedSearchPage from 'containers/pages/AdvancedSearch';
import SitesTable from 'containers/sites/SitesTable';
import SpeciesTable from 'containers/species/SpeciesTable';
import PopulationsTable from 'containers/species/SpeciesDetailTable';

jest.mock('../tables/CSVButton.js', () => 'csvbutton');

const setup = () => {
  const props = {
    getOptions: jest.fn(),
    hasResults: true,
    options: {},
    onSearch: jest.fn()
  };

  const standard = {
    filter: 'iba',
    allColumns: ['scientific_name', 'english_name', 'population', 'genus', 'family'],
    columns: ['scientific_name', 'english_name', 'population', 'genus', 'family'],
    allExpandedColumns: ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'],
    expandedColumns: ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'],
    list: {
      data: [
        { csn: 'a' }
      ]
    }
  };

  const state = {
    sites: standard,
    species: standard,
    countries: standard,
    i18nState: { lang: '' },
    getSearchResults: jest.fn(),
    getSearchOptions: jest.fn(),
    search: {
      results: {
        rows: standard.list.data
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
      <AdvancedSearchPage {...props} />
    </Provider>, {
      context: { t: jest.fn() },
      childContextTypes: {
        t: PropTypes.func
      }
    }
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('AdvancedSearchPage', () => {
    it('should render', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('.l-page').length).toBeGreaterThan(0);
    });

    it('should render sites table', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.find('#searchSitesButton').simulate('click');
      enzymeWrapper.update();
      expect(enzymeWrapper.find(SitesTable).length).toBeGreaterThan(0);
    });

    it('should not render a sticky sites table', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.find('#searchSitesButton').simulate('click');
      enzymeWrapper.update();
      expect(enzymeWrapper.find('#sitesTable').find('.sticky-header').length).toEqual(0);
    });

    it('should render species table', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.find('#searchSpeciesButton').simulate('click');
      enzymeWrapper.update();
      expect(enzymeWrapper.find(SpeciesTable).length).toBeGreaterThan(0);
    });

    it('should not render a sticky species table header', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.find('#searchSitesButton').simulate('click');
      enzymeWrapper.update();
      expect(enzymeWrapper.find('#sitesTable').find('-sticky').length).toEqual(0);
    });

    it('should render populations table', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.find('#searchPopulationsButton').simulate('click');
      enzymeWrapper.update();
      expect(enzymeWrapper.find(PopulationsTable).length).toBeGreaterThan(0);
    });

    it('should not render a sticky populations table header', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.find('#searchPopulationsButton').simulate('click');
      enzymeWrapper.update();
      expect(enzymeWrapper.find(PopulationsTable).find('-sticky').length).toEqual(0);
    });
  });
});

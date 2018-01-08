/* global expect, jest */
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AdvancedSearchPage from 'components/pages/AdvancedSearchPage';

jest.mock('../tables/CSVButton.js', () => 'csvbutton');

const setup = () => {
  const props = {
    getOptions: jest.fn(),
    options: {},
    onSearch: jest.fn(),
    isFetching: false
  };

  const standard = {
    filter: 'iba',
    allColumns: ['scientific_name', 'english_name', 'population', 'genus', 'family'],
    columns: ['scientific_name', 'english_name', 'population', 'genus', 'family'],
    list: [
      { csn: 'a' }
    ]
  };

  const state = {
    i18nState: { lang: '' },
    search: standard
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
    // TODO add some tests
  });
});

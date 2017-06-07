/* global expect, jest */
import { mount } from 'enzyme';
import React from 'react';
import TableListHeader from 'components/tables/TableListHeader';

const setup = () => {
  const props = {
    data: [],
    columns: ['species', 'populations', 'original_a', 'original_b', 'original_c', 'csn'],
    sort: ''
  };
  const enzymeWrapper = mount(<TableListHeader {...props} />,
    { context: { t: jest.fn() } }
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('TableListHeader', () => {
    it('should render', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('.header').length).toEqual(1); // no
    });

    it('should render columns', () => {
      const { enzymeWrapper, props } = setup();
      expect(enzymeWrapper.find('.text').length).toEqual(props.columns.length + 1);
    });

    it('should center a, b, c', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('.text').at(3).find('.text')
        .first()
        .hasClass('-center'))
        .toEqual(true);
    });

    it('should display an overtitle for the countries table over a,b,c', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('.overheader').html())
        .toEqual(
          '<div class="overheader">' +
          'AEWA Table 1 Column A' +
          '</div>');
    });
  });
});

/* global expect, jest */
import { mount } from 'enzyme';
import React from 'react';
import TableListHeader from 'components/tables/TableListHeader';

const setup = () => {
  const props = {
    data: [
      {
        original_a: '1a'
      },
      {
        original_a: '1b'
      },
      {
        original_a: '2a'
      },
      {
        original_a: '1a'
      },
      {
        original_a: '3'
      }
    ],
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

    it('should render filters', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('.table-filter').length).toBeGreaterThan(0);
    });

    it('should render a,b,c filters in hierarchy', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('.table-filter').first()
        .find('option')
        .at(1)
        .text()
      ).toEqual('1');

      expect(enzymeWrapper.find('.table-filter').first()
        .find('option')
        .at(1)
        .get(0)
        .value
      ).toEqual(JSON.stringify(['1', '1a', '1b']));

      expect(enzymeWrapper.find('.table-filter').first()
        .find('option')
        .at(4)
        .text()
      ).toEqual('2');
    });

    it('should not create a subcolumn if the original column is a parent', () => {
      // i.e. 2 should not yield " - 2"
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('.table-filter').first().find('option').length).toBe(7);
    });
  });
});

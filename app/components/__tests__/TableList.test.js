/* global expect, jest */
import { mount } from 'enzyme';
import React from 'react';
import TableList from 'components/tables/TableList';

const setup = () => {
  const props = {
    data: [
      {
        testTrue: true,
        testFalse: false,
        testTextTrue: 'true'
      }
    ],
    columns: ['testTrue', 'testFalse', 'testTextTrue']
  };
  const enzymeWrapper = mount(<TableList {...props} />,
    { context: { t: jest.fn() } }
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('TableList', () => {
    it('should render', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('div').length).toBeGreaterThan(0); // no
    });

    it('should render boolean true as a tick', () => {
      const { enzymeWrapper } = setup();
      expect(
        enzymeWrapper.find('.testTrue').find('use').html()
      ).toEqual('<use xlink:href="#icon-tick"></use>');
      expect(
        enzymeWrapper.find('.testTextTrue').text()
      ).toEqual('true');
    });

    it('should render boolean false as blank', () => {
      const { enzymeWrapper } = setup();
      expect(
        enzymeWrapper.find('.testFalse').text()
      ).toEqual('');
    });
  });
});

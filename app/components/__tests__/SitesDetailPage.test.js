/* global expect, jest */
import { shallow } from 'enzyme';
import React from 'react';
import SitesDetailPage from 'components/pages/SitesDetailPage';

const setup = () => {
  const props = {
    getSitesStats: jest.fn(),
    getSitesData: jest.fn(),
    stats: {
      site: [
        { hyperlink: 'http://www.cnn.com' }
      ]
    }
  };

  const enzymeWrapper = shallow(<SitesDetailPage {...props} />,
    { context: { t: jest.fn() } }
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('SitesDetailPage', () => {
    it('should render', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('.l-page').length).toBeGreaterThan(0);
    });

    it('should include a link to the birdlife factsheet', () => {
      const { enzymeWrapper, props } = setup();
      expect(enzymeWrapper.find('#birdlife-factsheet-link').first().html()).toEqual(
        '<div id="birdlife-factsheet-link" class="item">' +
          '<div class="label">Birdlife Factsheet</div>' +
          '<div class="value">' +
            `<a class="external-link" target="_blank" href="${props.stats.site[0].hyperlink}">` +
              '<svg class="icon -small -white"><use xlink:href="#icon-open_in_new"></use></svg>' +
            '</a>' +
          '</div>' +
        '</div>'
      );
    });
  });
});

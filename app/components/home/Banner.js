import React from 'react';
import BasicMap from 'components/maps/BasicMap';

function Banner(props, context) {
  return (
    <div className="c-banner">
      <BasicMap id="home-map" urlSync={false} shareControl={false} />
      <div className="content">
        <svg className="banner-logo">
          <use xlinkHref="#logo-big"></use>
        </svg>
        <h3 className="text -light -intro">
          {context.t('banner')}
        </h3>
        <div className="banner-logos">
          <a className="birdlife-logo" href="http://www.birdlife.org/" target="_blank" rel="noopener noreferrer">
            <img src="/img/birdlife@2x.png" alt="Bird life logo" />
          </a>
          <a className="wetlands-logo" href="https://www.wetlands.org/" target="_blank" rel="noopener noreferrer">
            <img src="/img/wetlands@2x.png" alt="Wet land logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

Banner.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default Banner;

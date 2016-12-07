import React from 'react';
import BasicMap from 'components/maps/BasicMap';

function Banner(props, context) {
  return (
    <div className="c-banner">
      <BasicMap />
      <div className="content">
        <svg>
          <use xlinkHref="#logo-big"></use>
        </svg>
        <h3 className="text -light -intro">
          {context.t('banner')}
        </h3>
      </div>
    </div>
  );
}

Banner.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default Banner;

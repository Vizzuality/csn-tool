import React from 'react';
import NavLink from 'containers/common/NavLink';
import BasicMap from 'components/maps/BasicMap';

function Banner() {
  return (
    <div className="c-banner">
      <BasicMap />
      <div className="content">
        <h3>
          The Critical Site Network (CSN) Tool is an online resource for the conservation
          of 294 species of waterbirds and the important sites upon which they depend
          in Africa and Western Eurasia.
        </h3>
        <NavLink to="/sites" i18nText="getStarted" className="btn" />
      </div>
    </div>
  );
}

export default Banner;

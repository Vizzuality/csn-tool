import React from 'react';
import NavLink from 'containers/common/NavLink';
import CountriesMap from 'containers/maps/CountriesMap';
import CountriesTable from 'containers/tables/CountriesTable';

function CountriesPage(props) {
  return (
    <div className="l-page">
      {props.country &&
        <div className="l-navigation">
          <div className="row">
            <div className="column">
              <NavLink to="/countries" i18nText="back" />
            </div>
          </div>
        </div>
      }
      <CountriesMap country={props.country} />
      <div className="row">
        <div className="column">
          {props.country &&
            <CountriesTable country={props.country} />
          }
        </div>
      </div>
    </div>
  );
}

CountriesPage.propTypes = {
  country: React.PropTypes.string
};

export default CountriesPage;

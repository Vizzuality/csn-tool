import React from 'react';
import NavLink from 'containers/common/NavLink';
import CountriesMap from 'containers/maps/CountriesMap';
import CountriesTable from 'containers/tables/CountriesTable';

function CountriesPage(props, context) {
  return (
    <div className="l-page">
      <div className="l-navigation">
        <div className="row">
          <div className="column c-navigation">
            {props.country
              ? <div>
                <NavLink className="breadcrumb" to="/countries" i18nText="backToCountries" />
                <h2>{props.country}</h2>
              </div>
              : <h2>{context.t('countries')} <span>({props.countriesLength || ''})</span></h2>
            }
          </div>
        </div>
      </div>
      <div className={`l-map ${props.country ? '-short' : ''}`}>
        <CountriesMap country={props.country} />
      </div>
      <div className="l-content">
        <div className="row">
          <div className="column">
            {props.country &&
              <CountriesTable country={props.country} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

CountriesPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CountriesPage.propTypes = {
  country: React.PropTypes.string,
  countriesLength: React.PropTypes.number
};

export default CountriesPage;

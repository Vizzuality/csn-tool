import React from 'react';
import CountriesMap from 'containers/maps/CountriesMap';
import CountriesTable from 'containers/tables/CountriesTable';

function CountriesPage(props) {
  return (
    <div className="l-page">
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

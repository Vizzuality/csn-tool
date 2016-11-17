import React from 'react';
import NavLink from 'containers/common/NavLink';
import CountriesMap from 'containers/countries/CountriesMap';
import CountriesTable from 'containers/countries/CountriesTable';

class CountriesPage extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column c-navigation">
              {this.props.country
                ? <div>
                  <NavLink className="breadcrumb" to="/countries" i18nText="backToCountries" />
                  <h2>{this.props.country}</h2>
                </div>
                : <h2>{context.t('countries')} <span>({this.props.countriesLength || ''})</span></h2>
              }
            </div>
          </div>
        </div>
        <div className={`l-map ${this.props.country ? '-short' : ''}`}>
          <CountriesMap />
        </div>
        <div className="l-content">
          <div className="row">
            <div className="column">
              {this.props.country &&
                <CountriesTable country={this.props.country} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CountriesPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CountriesPage.propTypes = {
  country: React.PropTypes.string,
  countriesLength: React.PropTypes.number
};

export default CountriesPage;

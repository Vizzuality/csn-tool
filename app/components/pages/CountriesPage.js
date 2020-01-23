import React from 'react';
import PropTypes from 'prop-types';
import GoBackLink from 'containers/common/GoBackLink';
import CountriesMap from 'containers/countries/CountriesMap';
import CountriesTable from 'containers/countries/CountriesTable';
import { translations } from 'locales/translations';
import { StickyContainer } from 'react-sticky';
import CountriesSearch from 'containers/countries/CountriesSearch';

class CountriesPage extends React.Component {
  constructor() {
    super();
    this.languages = Object.keys(translations).map((lang) => (
      { value: lang, label: lang.toUpperCase() }
    ));
  }

  componentWillMount() {
    this.getData(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.country && this.hasNewParams(newProps)) {
      this.getData(newProps);
    }
  }

  getData(props) {
    if (props.country) {
      if (!props.countryStats) props.getCountryStats(props.country);
      if (!props.countryData) props.getCountryData(props.country, props.category, props.selectedPopulationId);
    }
    if (!props.countryData) props.getCountriesList();
  }

  hasNewParams(newProps) {
    return this.props.country !== newProps.country
      || this.props.category !== newProps.category
      || this.props.selectedPopulationId !== newProps.selectedPopulationId;
  }

  render() {
    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column c-navigation">
              {this.props.country
                ? <div>
                  <div className="content">
                    <div className="title">
                      <GoBackLink className="breadcrumb" i18nText="back" endPoint="countries" />
                      <h2>{this.props.countryStats.country}</h2>
                    </div>
                  </div>
                </div>
                : <div className="content -filters">
                  <div className="title">
                    <h2>{this.context.t('countries')} <span>({this.props.countriesLength || ''})</span></h2>
                  </div>
                  <div className="filter">
                    <CountriesSearch
                      placeholder={this.context.t('countriesNameSearch')}
                      label={this.context.t('searchBy')}
                      labelType="light"
                      searchType="dark"
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className={`l-map ${this.props.country ? '-short -header' : '-header'}`}>
          <CountriesMap
            id="countries-map"
            countries={this.props.countries}
          />
        </div>
        <StickyContainer>
          <div className={`row l-content ${this.props.country ? '-short' : ''}`}>
            <div className="column">
              {this.props.country && <CountriesTable />}
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}

CountriesPage.contextTypes = {
  t: PropTypes.func.isRequired
};

CountriesPage.propTypes = {
  country: PropTypes.string,
  selectedPopulationId: PropTypes.string,
  category: PropTypes.string,
  countryStats: PropTypes.any,
  countryData: PropTypes.any,
  getCountryStats: PropTypes.func.isRequired,
  getCountryData: PropTypes.func.isRequired,
  countriesLength: PropTypes.number,
  countries: PropTypes.array,
  searchFilter: PropTypes.string,
  router: PropTypes.object,
  params: PropTypes.object,
  lang: PropTypes.string,
  getCountryLookAlikeSpecies: PropTypes.func
};

export default CountriesPage;

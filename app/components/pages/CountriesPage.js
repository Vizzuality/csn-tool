import React from 'react';
import GoBackLink from 'containers/common/GoBackLink';
import CountriesMap from 'containers/countries/CountriesMap';
import CountriesTable from 'containers/countries/CountriesTable';
import Select from 'react-select';
import { replaceUrlParams } from 'helpers/router';
import { translations } from 'locales/translations';
import { StickyContainer } from 'react-sticky';

const FILTER_OPTIONS = [
  { value: 'all', label: 'ALL' },
  { value: 'aewa', label: 'AEWA' },
  { value: 'ramsar', label: 'RAMSAR' }
];

class CountriesPage extends React.Component {
  constructor() {
    super();
    this.languages = Object.keys(translations).map((lang) => (
      { value: lang, label: lang.toUpperCase() }
    ));
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillMount() {
    this.getData(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.country && this.hasNewParams(newProps)) {
      this.getData(newProps);
    }
  }

  onSelectChange(filter) {
    const params = {
      filter: filter.value
    };
    const route = this.props.router.getCurrentLocation();
    const url = replaceUrlParams(route.pathname + route.search, params);
    this.props.router.push(url);
  }

  getData(props) {
    if (props.country) {
      if (!props.countryStats) props.getCountryStats(props.country);
      if (!props.countryData) props.getCountryData(props.country, props.category);
    }
    if (!props.countryData) props.getCountriesList();
  }

  hasNewParams(newProps) {
    return this.props.country !== newProps.country
      || this.props.category !== newProps.category;
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
                    <h4 className="text -input-label -light">Filter by</h4>
                    <Select
                      name="filter-countries"
                      className="c-select -plain"
                      clearable={false}
                      searchable={false}
                      value={this.props.filter ? this.props.filter : 'all'}
                      options={FILTER_OPTIONS}
                      onChange={this.onSelectChange}
                      arrowRenderer={() => <svg className="icon"><use xlinkHref="#icon-dropdown_arrow_down"></use></svg>}
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className={`l-map ${this.props.country ? '-short -header' : '-header'}`}>
          <CountriesMap id="countries-map" filter={this.props.filter} countries={this.props.countries} />
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
  t: React.PropTypes.func.isRequired
};

CountriesPage.propTypes = {
  country: React.PropTypes.string,
  category: React.PropTypes.string,
  countryStats: React.PropTypes.any,
  countryData: React.PropTypes.any,
  getCountryStats: React.PropTypes.func.isRequired,
  getCountryData: React.PropTypes.func.isRequired,
  countriesLength: React.PropTypes.number,
  countries: React.PropTypes.array,
  filter: React.PropTypes.string,
  router: React.PropTypes.object,
  params: React.PropTypes.object,
  lang: React.PropTypes.string
};

export default CountriesPage;

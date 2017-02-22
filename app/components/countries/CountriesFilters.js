import React from 'react';
import NavLink from 'containers/common/NavLink';
import CountriesSearch from 'containers/countries/CountriesSearch';


class TableFilters extends React.Component {

  componentDidMount() {
    this.props.getFiltersHeight(this.filtersContainer.offsetHeight);
  }

  render() {
    return (
      <div id="table-filters" className="row c-table-filters" ref={(ref) => { this.filtersContainer = ref; }}>
        <div className="column small-12 medium-8">
          <div className="tags">
            <NavLink to={`/countries/${this.props.country}/sites`} i18nText="sites" className={this.props.category && this.props.category === 'sites' ? 'is-active' : ''} />
            <NavLink to={`/countries/${this.props.country}/sitesOld`} i18nText="sitesOld" className={this.props.category && this.props.category === 'sitesOld' ? 'is-active' : ''} />
            <NavLink to={`/countries/${this.props.country}/species`} i18nText="species" className={this.props.category && this.props.category === 'species' ? 'is-active' : ''} />
            <NavLink to={`/countries/${this.props.country}/populations`} i18nText="populations" className={this.props.category && this.props.category === 'populations' ? 'is-active' : ''} />
            <NavLink to={`/countries/${this.props.country}/lookAlikeSpecies`} i18nText="lookAlikeSpecies" className={this.props.category && this.props.category === 'lookAlikeSpecies' ? 'is-active' : ''} />
          </div>
        </div>
        <div className="column small-12 medium-4">
          <CountriesSearch placeholder="countriesFilter" />
        </div>
      </div>
    );
  }
}

TableFilters.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableFilters.propTypes = {
  country: React.PropTypes.string.isRequired,
  category: React.PropTypes.string,
  getFiltersHeight: React.PropTypes.func
};

export default TableFilters;

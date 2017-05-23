import React from 'react';
import NavLink from 'containers/common/NavLink';
import CountriesSearch from 'containers/countries/CountriesSearch';

function TableFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <div className="tags">
          <NavLink to={`/countries/${props.country}/sites`} i18nText="IBA" className={props.category && props.category === 'sites' ? 'is-active' : ''} />
          <NavLink to={`/countries/${props.country}/criticalSites`} i18nText="criticalSites" className={props.category && props.category === 'criticalSites' ? 'is-active' : ''} />
          <NavLink to={`/countries/${props.country}/species`} i18nText="species" className={props.category && props.category === 'species' ? 'is-active' : ''} />
          <NavLink to={`/countries/${props.country}/populations`} i18nText="populations" className={props.category && props.category === 'populations' ? 'is-active' : ''} />
          <NavLink to={`/countries/${props.country}/lookAlikeSpecies`} i18nText="lookAlikeSpecies" className={props.category && props.category === 'lookAlikeSpecies' ? 'is-active' : ''} />
        </div>
      </div>
      <div className="column small-12 medium-4">
        <CountriesSearch placeholder="countriesFilter" />
      </div>
    </div>
  );
}

TableFilters.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableFilters.propTypes = {
  country: React.PropTypes.string.isRequired,
  category: React.PropTypes.string
};

export default TableFilters;

import React from 'react';
import PropTypes from 'prop-types';
import CSVButton from 'components/tables/CSVButton.js';
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
        <CSVButton data={props.data} columns={props.columns} />
      </div>
      <div className="column small-12 medium-4">
        <CountriesSearch placeholder="countriesFilter" />
      </div>
    </div>
  );
}

TableFilters.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};

TableFilters.propTypes = {
  country: PropTypes.string.isRequired,
  category: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array
};

export default TableFilters;

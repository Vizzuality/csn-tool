import React from 'react';
import NavLink from 'containers/common/NavLink';

function TableFilters(props, context) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-5">
        <div className="tags">
          <NavLink to={`/countries/${props.country}/sites`} i18nText="sites" />
          <NavLink to={`/countries/${props.country}/species`} i18nText="species" />
          <NavLink to={`/countries/${props.country}/populations`} i18nText="populations" />
        </div>
      </div>
      <div className="column small-12 offset-medium-1 medium-2 filters">
        <div>
          {context.t('filters')}
        </div>
      </div>
      <div className="column small-12 medium-4 search">
        <div>
          {context.t('search')}
        </div>
      </div>
    </div>
  );
}

TableFilters.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableFilters.propTypes = {
  country: React.PropTypes.string.isRequired
};

export default TableFilters;

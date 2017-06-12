import React from 'react';
import SpeciesSearch from 'containers/species/SpeciesSearch';
import Filter from 'containers/advanced-search/Filter';

function SpeciesFilters(props, context) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        {!props.isSearch && <h2>{context.t('species')}</h2>}
      </div>
      <div className="column small-12 medium-4">
        {props.isSearch ?
          <Filter placeholder="speciesFilter" /> :
          <SpeciesSearch placeholder="speciesFilter" />
        }
      </div>
    </div>
  );
}

SpeciesFilters.propTypes = {
  isSearch: React.PropTypes.bool.isRequired
};

SpeciesFilters.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default SpeciesFilters;

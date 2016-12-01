import React from 'react';
import SpeciesSearch from 'containers/species/SpeciesSearch';

function SpeciesFilters(props, context) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <h2>{context.t('speciesList')}</h2>
      </div>
      <div className="column small-12 medium-4">
        <SpeciesSearch placeholder="speciesFilter" />
      </div>
    </div>
  );
}

SpeciesFilters.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default SpeciesFilters;

import React from 'react';
import CSVButton from 'components/tables/CSVButton.js';
import SpeciesSearch from 'containers/species/SpeciesSearch';
import Filter from 'containers/advanced-search/Filter';

function SpeciesFilters(props, context) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        {!props.isSearch && <h2 style={{ display: 'inline-block' }}>{context.t('species')}</h2>}
        <div style={{ display: 'inline-block', marginTop: 14, verticalAlign: 'top' }}>
          <CSVButton data={props.data} columns={props.columns} />
        </div>
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
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  isSearch: React.PropTypes.bool.isRequired
};

SpeciesFilters.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default SpeciesFilters;

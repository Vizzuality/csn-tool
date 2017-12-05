import React from 'react';
import CSVButton from 'components/tables/CSVButton.js';
import SitesSearch from 'containers/sites/SitesSearch';
import Filter from 'containers/advanced-search/Filter';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <div style={{ display: 'inline-block', marginTop: 14, verticalAlign: 'top' }}>
          <CSVButton loadData={props.loadData} columns={props.columns} />
        </div>
      </div>
      <div className="column small-12 medium-4">
        {props.isSearch ?
          <Filter id={props.id} placeholder="sitesFilter" /> :
          <SitesSearch id={props.id} placeholder="sitesFilter" />
        }
      </div>
    </div>
  );
}

SitesFilters.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

SitesFilters.propTypes = {
  data: React.PropTypes.array,
  loadData: React.PropTypes.func,
  columns: React.PropTypes.array,
  id: React.PropTypes.any,
  isSearch: React.PropTypes.bool.isRequired,
  category: React.PropTypes.string
};

export default SitesFilters;

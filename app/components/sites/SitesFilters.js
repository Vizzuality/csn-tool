import React from 'react';
import PropTypes from 'prop-types';
import CSVButton from 'components/tables/CSVButton.js';
import SitesSearch from 'containers/sites/SitesSearch';
import Filter from 'containers/advanced-search/Filter';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <div style={{ display: 'inline-block', marginTop: 14, verticalAlign: 'top' }}>
          <CSVButton data={props.csvData} columns={props.columns} />
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
  t: PropTypes.func.isRequired
};

SitesFilters.propTypes = {
  csvData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]),
  columns: PropTypes.array,
  id: PropTypes.any,
  isSearch: PropTypes.bool.isRequired,
  category: PropTypes.string
};

export default SitesFilters;

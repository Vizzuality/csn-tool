import React from 'react';
import PropTypes from 'prop-types';
import CSVButton from 'components/tables/CSVButton.js';
import SitesSearch from 'containers/sites/SitesSearch';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <div style={{ display: 'inline-block', marginTop: 14, verticalAlign: 'top' }}>
          <CSVButton data={props.csvData} columns={props.columns} />
        </div>
      </div>
      <div className="column small-12 medium-4">
        <SitesSearch id={props.id} placeholder="sitesFilter" />
      </div>
    </div>
  );
}

SitesFilters.propTypes = {
  csvData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]),
  columns: PropTypes.array,
  id: PropTypes.any,
  category: PropTypes.string
};

export default SitesFilters;

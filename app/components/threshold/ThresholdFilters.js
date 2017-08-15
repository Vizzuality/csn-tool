import React from 'react';
import CSVButton from 'components/tables/CSVButton.js';
import ThresholdSearch from 'containers/threshold/ThresholdSearch';

function TresholdFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <h2>Matching Populations
          <CSVButton data={props.data} columns={props.columns} />
        </h2>
      </div>
      <div className="column small-12 medium-4">
        <ThresholdSearch placeholder="sitesFilter" />
      </div>
    </div>
  );
}

TresholdFilters.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default TresholdFilters;

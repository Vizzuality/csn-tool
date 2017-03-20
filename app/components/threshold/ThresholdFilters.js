import React from 'react';
import ThresholdSearch from 'containers/threshold/ThresholdSearch';

function TresholdFilters() {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-4 medium-offset-8">
        <ThresholdSearch placeholder="sitesFilter" />
      </div>
    </div>
  );
}

TresholdFilters.propTypes = {};

export default TresholdFilters;

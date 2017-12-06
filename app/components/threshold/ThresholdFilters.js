import React from 'react';
import PropTypes from 'prop-types';
import CSVButton from 'components/tables/CSVButton.js';
import ThresholdSearch from 'containers/threshold/ThresholdSearch';

function ThresholdFilters(props, context) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <h2>{context.t('ramsarCriterionToolFilterHeader')}
          <CSVButton data={props.data} columns={props.columns} />
        </h2>
      </div>
      <div className="column small-12 medium-4">
        <ThresholdSearch placeholder="sitesFilter" />
      </div>
    </div>
  );
}

ThresholdFilters.contextTypes = {
  t: PropTypes.func.isRequired
};

ThresholdFilters.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default ThresholdFilters;

import React from 'react';
import SitesSearch from 'containers/sites/SitesSearch';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-4 medium-offset-8">
        <SitesSearch id={props.id} placeholder="sitesFilter" />
      </div>
    </div>
  );
}

SitesFilters.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

SitesFilters.propTypes = {
  id: React.PropTypes.any,
  category: React.PropTypes.string
};

export default SitesFilters;

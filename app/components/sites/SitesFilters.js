import React from 'react';
import SitesSearch from 'containers/sites/SitesSearch';
import Filter from 'containers/advanced-search/Filter';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-4 medium-offset-8">
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
  id: React.PropTypes.any,
  isSearch: React.PropTypes.bool.isRequired,
  category: React.PropTypes.string
};

export default SitesFilters;

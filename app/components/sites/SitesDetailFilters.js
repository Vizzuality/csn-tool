import React from 'react';
import NavLink from 'containers/common/NavLink';
import SitesDetailSearch from 'containers/sites/SitesDetailSearch';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <div className="tags">
          <NavLink to={`/sites/${props.id}/species`} i18nText="qualifyingSpecies" className={props.category && props.category === 'species' ? 'is-active' : ''} />
          <NavLink to={`/sites/${props.id}/populations`} i18nText="populations" className={props.category && props.category === 'populations' ? 'is-active' : ''} />
        </div>
      </div>
      <div className="column small-12 medium-4">
        <SitesDetailSearch placeholder="sitesFilter" />
      </div>
    </div>
  );
}

SitesFilters.propTypes = {
  id: React.PropTypes.string,
  category: React.PropTypes.string
};

export default SitesFilters;

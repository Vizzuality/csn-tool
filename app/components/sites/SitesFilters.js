import React from 'react';
import NavLink from 'containers/common/NavLink';
import SitesSearch from 'containers/sites/SitesSearch';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <div className="tags">
          <NavLink to={`/sites/${props.slug}/species`} i18nText="species" className={props.category && props.category === 'species' ? 'is-active' : ''} />
          <NavLink to={`/sites/${props.slug}/threats`} i18nText="threats" className={props.category && props.category === 'threats' ? 'is-active' : ''} />
        </div>
      </div>
      <div className="column small-12 medium-4">
        <SitesSearch />
      </div>
    </div>
  );
}

SitesFilters.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

SitesFilters.propTypes = {
  slug: React.PropTypes.string,
  category: React.PropTypes.string
};

export default SitesFilters;
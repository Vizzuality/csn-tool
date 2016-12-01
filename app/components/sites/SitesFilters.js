import React from 'react';
import NavLink from 'containers/common/NavLink';
import SitesSearch from 'containers/sites/SitesSearch';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <div className="tags">
          <NavLink to={`/sites/${props.id}/species`} i18nText="species" className={props.category && props.category === 'species' ? 'is-active' : ''} />
          <NavLink to={`/sites/${props.id}/populations`} i18nText="populations" className={props.category && props.category === 'populations' ? 'is-active' : ''} />
          <NavLink to={`/sites/${props.id}/habitats`} i18nText="habitats" className={props.category && props.category === 'habitats' ? 'is-active' : ''} />
          <NavLink to={`/sites/${props.id}/threats`} i18nText="threats" className={props.category && props.category === 'threats' ? 'is-active' : ''} />
        </div>
      </div>
      <div className="column small-12 medium-4">
        <SitesSearch placeholder="sitesFilter" />
      </div>
    </div>
  );
}

SitesFilters.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

SitesFilters.propTypes = {
  id: React.PropTypes.string,
  category: React.PropTypes.string
};

export default SitesFilters;

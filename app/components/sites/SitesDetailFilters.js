import React from 'react';
import PropTypes from 'prop-types';
import CSVButton from 'components/tables/CSVButton.js';
import NavLink from 'containers/common/NavLink';
import SitesDetailSearch from 'containers/sites/SitesDetailSearch';

function SitesFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        <div className="tags">
          <NavLink to={`/sites/${props.type}/${props.id}/species`} i18nText={`${props.type}_qualifying_species`} className={props.category && props.category === 'species' ? 'is-active' : ''} />
          {props.type === 'csn' &&
            <NavLink to={`/sites/csn/${props.id}/csnVulnerability`} i18nText={'vulnerability'} className={props.category && props.category === 'csnVulnerability' ? 'is-active' : ''} />
          }
        </div>
        <CSVButton data={props.data} columns={props.columns} />
      </div>
      <div className="column small-12 medium-4">
        <SitesDetailSearch placeholder="sitesFilter" />
      </div>
    </div>
  );
}

SitesFilters.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.any,
  id: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string
};

export default SitesFilters;

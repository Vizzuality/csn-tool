import React from 'react';
import PropTypes from 'prop-types';
import CSVButton from 'components/tables/CSVButton.js';
import NavLink from 'containers/common/NavLink';
import SpeciesDetailSearch from 'containers/species/SpeciesDetailSearch';
import Filter from 'containers/advanced-search/Filter';

function SpeciesDetailFilters(props) {
  return (
    <div className="row c-table-filters">
      <div className="column small-12 medium-8">
        {!props.isSearch &&
          <div className="tags">
            <NavLink to={`/species/${props.id}/sites`} i18nText="IBA" className={props.category && props.category === 'sites' ? 'is-active' : ''} />
            <NavLink to={`/species/${props.id}/criticalSites`} i18nText="CSN" className={props.category && props.category === 'criticalSites' ? 'is-active' : ''} />
            <NavLink to={`/species/${props.id}/population`} i18nText="population" className={props.category && props.category === 'population' ? 'is-active' : ''} />
            <NavLink to={`/species/${props.id}/lookAlikeSpecies`} i18nText="lookAlikeSpecies" className={props.category && props.category.startsWith('lookAlikeSpecies') ? 'is-active' : ''} />
          </div>
        }
        <CSVButton data={props.data} columns={props.columns} />
      </div>
      <div className="column small-12 medium-4">
        {props.isSearch ?
          <Filter placeholder="speciesFilter" /> :
          <SpeciesDetailSearch placeholder="speciesFilter" />
        }
      </div>
    </div>
  );
}

SpeciesDetailFilters.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};

SpeciesDetailFilters.propTypes = {
  id: PropTypes.string,
  category: PropTypes.string,
  isSearch: PropTypes.bool,
  data: PropTypes.array,
  columns: PropTypes.array
};

export default SpeciesDetailFilters;

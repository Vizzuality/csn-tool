import React from 'react';
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
            <NavLink to={`/species/${props.id}/population`} i18nText="population" className={props.category && props.category === 'population' ? 'is-active' : ''} />
            <NavLink to={`/species/${props.id}/lookAlikeSpecies`} i18nText="lookAlikeSpecies" className={props.category && props.category === 'lookAlikeSpecies' ? 'is-active' : ''} />
          </div>
        }
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
  t: React.PropTypes.func.isRequired
};

SpeciesDetailFilters.propTypes = {
  id: React.PropTypes.string,
  category: React.PropTypes.string,
  isSearch: React.PropTypes.bool
};

export default SpeciesDetailFilters;

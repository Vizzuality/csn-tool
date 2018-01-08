import React from 'react';
import PropTypes from 'prop-types';

import NavLink from 'containers/common/NavLink';

const SpeciesPopulationHeader = ({ species, backLinkTo }, context) => ((
  <div className="table-navigation">
    <NavLink to={backLinkTo} className="btn -back">
      <span className="link">
        {context.t('backToSpecies')}
      </span>
    </NavLink>
    <div className="nav">
      <div>
        <span className="title">{context.t('species')}</span>
        <h3>{species.original_species}</h3>
      </div>
      <div>
        <span className="title">{context.t('population')}</span>
        <span>{species.population}</span>
      </div>
      <div>
        <span className="title">A</span>
        <span>{species.original_a || '-'}</span>
      </div>
      <div>
        <span className="title">B</span>
        <span>{species.original_b || '-'}</span>
      </div>
      <div>
        <span className="title">C</span>
        <span>{species.original_c || '-'}</span>
      </div>
    </div>
  </div>
));

SpeciesPopulationHeader.contextTypes = {
  t: PropTypes.func.isRequired
};

SpeciesPopulationHeader.propTypes = {
  species: PropTypes.any.isRequired,
  backLinkTo: PropTypes.string.isRequired
};

export default SpeciesPopulationHeader;

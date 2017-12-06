import React from 'react';
import PropTypes from 'prop-types';
import SpeciesTable from 'containers/species/SpeciesTable';
import { StickyContainer } from 'react-sticky';

class SpeciesPage extends React.Component {
  componentWillMount() {
    if (!this.props.species) {
      this.props.getSpeciesList();
    }
  }

  render() {
    return (
      <StickyContainer>
        <div className="l-page -header row">
          <div className="column c-table">
            <SpeciesTable data={this.props.species} />
          </div>
        </div>
      </StickyContainer>
    );
  }
}

SpeciesPage.contextTypes = {
  t: PropTypes.func.isRequired
};


SpeciesPage.propTypes = {
  getSpeciesList: PropTypes.func.isRequired,
  species: PropTypes.any.isRequired // bool or array
};

export default SpeciesPage;

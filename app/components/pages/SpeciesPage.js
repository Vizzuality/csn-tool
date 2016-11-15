import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';
import SpeciesTable from 'components/tables/SpeciesTable';

class SpeciesPage extends React.Component {
  componentWillMount() {
    if (!this.props.species.length) {
      this.props.getSpeciesList();
    }
  }

  render() {
    return (
      <div className="l-page row">
        <div className="column">
          {!this.props.species.length
            ? <LoadingSpinner transparent />
            : <SpeciesTable data={this.props.species} />
          }
        </div>
      </div>
    );
  }
}

SpeciesPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};


SpeciesPage.propTypes = {
  getSpeciesList: React.PropTypes.func.isRequired,
  species: React.PropTypes.array
};

export default SpeciesPage;

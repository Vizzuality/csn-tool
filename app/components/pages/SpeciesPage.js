import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';
import TableList from 'components/common/TableList';

class SpeciesPage extends React.Component {
  componentWillMount() {
    if (!this.props.species.length) {
      this.props.getSpeciesList();
    }
  }

  render() {
    const columns = ['scientific_name', 'english_name', 'family', 'genus'];
    return (
      <div className="row">
        <div className="column">
          <h2>{this.context.t('species')}</h2>

          {!this.props.species.length
            ? <LoadingSpinner transparent />
            : <TableList
              data={this.props.species}
              columns={columns}
            />
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

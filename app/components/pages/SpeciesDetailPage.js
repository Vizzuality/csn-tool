import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';
import SpeciesMap from 'components/maps/SpeciesMap';
import TableList from 'components/tables/TableList';

class SpeciesDetailPage extends React.Component {
  componentWillMount() {
    if (!this.props.data.length) {
      this.props.getSpecies(this.props.slug);
    }
  }

  getContent() {
    return (
      <div>
        <SpeciesMap species={this.props.data} />
        <div className="row">
          <div className="column">
            <TableList
              data={this.props.data}
              columns={['iba_criteria', 'season', 'max', 'min', 'avg']}
            />;
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.data.error) return <p>There was an error getting data</p>;
    return (
      <div className="l-page">
        {!this.props.data.length
          ? <LoadingSpinner transparent />
          : this.getContent()
        }
      </div>
    );
  }
}

SpeciesDetailPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};


SpeciesDetailPage.propTypes = {
  slug: React.PropTypes.string.isRequired,
  getSpecies: React.PropTypes.func.isRequired,
  data: React.PropTypes.any
};

export default SpeciesDetailPage;

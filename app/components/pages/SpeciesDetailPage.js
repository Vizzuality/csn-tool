import React from 'react';
import SpeciesMap from 'components/species/SpeciesMap';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';

class SpeciesDetailPage extends React.Component {
  componentWillMount() {
    if (!this.props.data) {
      this.props.getSpecies(this.props.slug);
    }
  }

  render() {
    if (this.props.data.error) return <p>There was an error getting data</p>;
    return (
      <div className="l-page">
        <SpeciesMap data={this.props.data} />
        <div className="l-content">
          <div className="row">
            <div className="column">
              <SpeciesDetailTable data={this.props.data} />
            </div>
          </div>
        </div>
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

import React from 'react';
import GoBackLink from 'containers/common/GoBackLink';
import SpeciesMap from 'components/species/SpeciesMap';
import SpeciesDetailTable from 'containers/species/SpeciesDetailTable';

class SpeciesDetailPage extends React.Component {

  componentWillMount() {
    this.props.getSpeciesStats(this.props.id);

    if (!this.props.sites) {
      this.props.getSpeciesData(this.props.id, this.props.category);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.hasNewParams(newProps)) {
      this.props.getSpeciesStats(newProps.id);
      this.props.getSpeciesData(newProps.id, newProps.category);
    }
  }

  hasNewParams(newProps) {
    return this.props.id !== newProps.id
      || this.props.category !== newProps.category;
  }

  render() {
    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column c-navigation">
              {this.props.stats.species
                ? <div className="content">
                  <div className="title">
                    <GoBackLink className="breadcrumb" i18nText="back" />
                    <div className="name">
                      <h2 className="scientific-name">{this.props.stats.species[0].scientific_name}</h2>
                      <div className={`iucn-icon -${this.props.stats.species[0].iucn_category}`}>
                        {this.props.stats.species[0].iucn_category}
                      </div>
                    </div>
                  </div>
                  <div className="stats">
                    <div className="list">
                      <div className="item">
                        <div className="label">
                          English name
                        </div>
                        <div className="value">
                          {this.props.stats.species[0].english_name}
                        </div>
                      </div>
                      <div className="item">
                        <div className="label">
                          Family
                        </div>
                        <div className="value">
                          {this.props.stats.species[0].family}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : ''
              }
            </div>
          </div>
        </div>
        <div className="l-map -short -header">
          <SpeciesMap id={this.props.id} data={this.props.sites} />
        </div>
        <div className="row l-content">
          <div className="column">
            <SpeciesDetailTable data={this.props.sites} id={this.props.id} category={this.props.category} />
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
  id: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  getSpeciesStats: React.PropTypes.func.isRequired,
  getSpeciesData: React.PropTypes.func.isRequired,
  stats: React.PropTypes.any.isRequired,
  sites: React.PropTypes.any
};

export default SpeciesDetailPage;

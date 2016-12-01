import React from 'react';
import NavLink from 'containers/common/NavLink';
import SpeciesMap from 'components/species/SpeciesMap';
import SpeciesDetailTable from 'containers/species/SpeciesDetailTable';

class SpeciesDetailPage extends React.Component {
  componentWillMount() {
    if (!this.props.sites) {
      this.props.getSpeciesData(this.props.id, this.props.category);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.hasNewParams(newProps)) {
      this.props.getSpeciesData(newProps.id, newProps.category);
    }
  }

  hasNewParams(newProps) {
    return this.props.id !== newProps.id
      || this.props.category !== newProps.category;
  }

  render() {
    if (this.props.sites.error) return <p>There was an error getting data</p>;
    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column c-navigation">
              {this.props.id
                ? <div className="content">
                  <div className="title">
                    <NavLink className="breadcrumb" to="/species" i18nText="backToSpecies" />

                    <h2>{this.props.id}</h2>
                  </div>
                  <div className="stats">
                    <div className="list">
                      <div className="item">
                        <div className="label">
                          English name
                        </div>
                        <div className="value">
                          Value
                        </div>
                      </div>
                      <div className="item">
                        <div className="label">
                          Family
                        </div>
                        <div className="value">
                          Value
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
        <div className="l-content">
          <div className="row">
            <div className="column">
              <SpeciesDetailTable data={this.props.sites} id={this.props.id} category={this.props.category} />
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
  id: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  getSpeciesData: React.PropTypes.func.isRequired,
  sites: React.PropTypes.any
};

export default SpeciesDetailPage;

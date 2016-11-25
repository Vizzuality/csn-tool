import React from 'react';
import NavLink from 'containers/common/NavLink';
import SpeciesMap from 'components/species/SpeciesMap';
import SpeciesDetailTable from 'containers/species/SpeciesDetailTable';
import { unslug } from 'helpers/string';

class SpeciesDetailPage extends React.Component {
  componentWillMount() {
    if (!this.props.sites) {
      this.props.getSpeciesData(this.props.slug, this.props.category);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.hasNewParams(newProps)) {
      this.props.getSpeciesData(newProps.slug, newProps.category);
    }
  }

  hasNewParams(newProps) {
    return this.props.slug !== newProps.slug
      || this.props.category !== newProps.category;
  }

  render() {
    if (this.props.sites.error) return <p>There was an error getting data</p>;
    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column c-navigation">
              {this.props.slug
                ? <div>
                  <NavLink className="breadcrumb" to="/species" i18nText="backToSpecies" />
                  <h2>{unslug(this.props.slug)}</h2>
                </div>
                : ''
              }
            </div>
          </div>
        </div>
        <div className="l-map -species-detail">
          <SpeciesMap slug={this.props.slug} data={this.props.sites} />
        </div>
        <div className="l-content">
          <div className="row">
            <div className="column">
              <SpeciesDetailTable data={this.props.sites} slug={this.props.slug} category={this.props.category} />
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
  category: React.PropTypes.string.isRequired,
  getSpeciesData: React.PropTypes.func.isRequired,
  sites: React.PropTypes.any
};

export default SpeciesDetailPage;

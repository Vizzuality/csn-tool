import React from 'react';
import PropTypes from 'prop-types';
import GoBackLink from 'containers/common/GoBackLink';
import SpeciesDetailMap from 'containers/species/SpeciesDetailMap';
import SpeciesDetailTable from 'containers/species/SpeciesDetailTable';
import { StickyContainer } from 'react-sticky';

class SpeciesDetailPage extends React.Component {
  componentWillMount() {
    this.getInitialData(this.props.id);
    if (this.props.category !== 'sites' && this.props.category !== 'population') {
      this.props.getSpeciesData(this.props.id, this.props.category, this.props.selectedPopulationId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.id !== this.props.id) {
      this.getInitialData(newProps.id);
    }

    if (this.hasNewParams(newProps) && !newProps.data) {
      this.props.getSpeciesData(newProps.id, newProps.category, newProps.selectedPopulationId);
    }
  }

  getInitialData(speciesId) {
    this.props.getSpeciesStats(speciesId);
    // Sites and populations always needed in the map
    this.props.getSpeciesData(speciesId, 'sites');
    this.props.getSpeciesData(speciesId, 'population');
  }

  hasNewParams(newProps) {
    return this.props.category !== newProps.category || this.props.selectedPopulationId !== newProps.selectedPopulationId;
  }

  render() {
    const nameColumn = this.props.lang === 'fr' ? 'french_name' : 'english_name';

    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column c-navigation">
              {this.props.stats.species &&
                <div className="content">
                  <div className="title">
                    <GoBackLink className="breadcrumb" i18nText="back" endPoint="species" />
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
                            {this.context.t(nameColumn)}
                        </div>
                        <div className="value">
                          {this.props.stats.species[0][nameColumn]}
                        </div>
                      </div>
                      <div className="item">
                        <div className="label">
                          {this.context.t('family')}
                        </div>
                        <div className="value">
                          {this.props.stats.species[0].family}
                        </div>
                      </div>
                      <div id="birdlife-factsheet-link" className="item">
                        <div className="label">
                          {this.context.t('birdlifeFactsheet')}
                        </div>
                        <div className="value">
                          <a className="external-link" target="_blank" href={this.props.stats.species[0].hyperlink}>
                            <svg className="icon -small -white">
                              <use xlinkHref="#icon-open_in_new"></use>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="l-map -short -header">
          <SpeciesDetailMap id="species-detail-map" />
        </div>
        <StickyContainer>
          <div className="row l-content -short">
            <div className="column">
              <SpeciesDetailTable id={this.props.id} category={this.props.category} />
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}

SpeciesDetailPage.contextTypes = {
  t: PropTypes.func.isRequired
};

SpeciesDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  selectedPopulationId: PropTypes.string,
  category: PropTypes.string.isRequired,
  getSpeciesStats: PropTypes.func.isRequired,
  getSpeciesData: PropTypes.func.isRequired,
  stats: PropTypes.any.isRequired,
  data: PropTypes.any,
  params: PropTypes.object,
  lang: PropTypes.string
};

export default SpeciesDetailPage;

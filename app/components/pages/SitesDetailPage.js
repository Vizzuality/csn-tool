import React from 'react';
import GoBackLink from 'containers/common/GoBackLink';
import SitesMap from 'containers/sites/SitesMap';
import SitesDetailTable from 'containers/sites/SitesDetailTable';

class SitesPage extends React.Component {
  componentWillMount() {
    this.getData(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getData(newProps);
  }

  getData(props) {
    this.props.getSitesStats(props.site);
    if (!props.data) {
      props.getSitesData(props.site, props.category);
    }
  }

  render() {
    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column">
              {this.props.stats.site &&
                <div className="navigation-wrapper">
                  <div className="c-navigation">
                    <div className="content">
                      <div className="title">
                        <GoBackLink className="breadcrumb" i18nText="back" />
                        <h2>{this.props.stats.site[0].name}</h2>
                      </div>
                      <div className="stats">
                        <div className="list">
                          <div className="item">
                            <div className="label">
                              Country
                            </div>
                            <div className="value">
                              {this.props.stats.site[0].country}
                            </div>
                          </div>
                          <div className="item">
                            <div className="label">
                              Protection status
                            </div>
                            <div className="value">
                              {this.props.stats.site[0].protection_status}
                            </div>
                          </div>
                          <div className="item">
                            <div className="label">
                              Qualifying Species
                            </div>
                            <div className="value">
                              {this.props.stats.site[0].qualifying_species}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="l-page">
          <div className="l-map -header -short">
            <SitesMap slug={this.props.site} />
          </div>
          <div className="l-table">
            <div className="row l-content -short">
              <div className="column">
                <SitesDetailTable
                  data={this.props.data}
                  slug={this.props.site}
                  category={this.props.category}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SitesPage.propTypes = {
  getSitesStats: React.PropTypes.func.isRequired,
  getSitesData: React.PropTypes.func.isRequired,
  stats: React.PropTypes.any,
  data: React.PropTypes.any,
  site: React.PropTypes.string,
  category: React.PropTypes.string
};

export default SitesPage;

import React from 'react';
import ViewToggler from 'components/sites/ViewToggler';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';
import { withRouter } from 'react-router';

class SitesPage extends React.Component {

  componentWillMount() {
    this.getData(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getData(newProps);
  }

  componentWillUnmount() {
    this.props.clearSites();
  }

  getData(props) {
    if (props.viewMode === 'map' && !props.locations) {
      props.getSitesLocations(props.router.params.type);
    }
  }

  render() {
    return (
      <div className="l-page">
        <div className={`l-navigation ${this.props.viewMode === 'list' ? '-dark' : ''} `}>
          <div className="row">
            <div className="column">
              <div className="navigation-wrapper">
                <div className="c-navigation">
                  <div className="content">
                    <div className="title">
                      <h2>{this.context.t('sites')}</h2>
                    </div>
                  </div>
                </div>
                <ViewToggler viewMode={this.props.viewMode} />
              </div>
            </div>
          </div>
        </div>
        <div className={`l-container ${this.props.viewMode === 'map' ? '-map' : ''} `}>
          {this.props.viewMode === 'list'
            ? <div className="row">
              <div className="column c-table">
                <SitesTable />
              </div>
            </div>
            : <SitesMap markerCluster id="sites-page-map" />
          }
        </div>
      </div>
    );
  }
}

SitesPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SitesPage.propTypes = {
  clearSites: React.PropTypes.func.isRequired,
  getSitesLocations: React.PropTypes.func.isRequired,
  setViewMode: React.PropTypes.func.isRequired,
  selected: React.PropTypes.string,
  viewMode: React.PropTypes.string
};

export default withRouter(SitesPage);

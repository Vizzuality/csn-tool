import React from 'react';
import ViewToggler from 'components/common/ViewToggler';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';
import { StickyContainer } from 'react-sticky';
import { withRouter } from 'react-router';

class SitesPage extends React.Component {

  componentWillMount() {
    this.props.setViewMode('map');
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
      props.getSitesLocations();
    }
  }

  render() {
    if (this.props.routeParams.view === 'table') {
      return (
        <div className="l-page">
          <div className="l-navigation -static">
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
                  <ViewToggler
                    viewMode={this.props.routeParams.view}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="l-table">
            <div className="row">
              <div className="column c-table">
                <SitesTable />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="l-page">
          <div className="l-navigation">
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
                  <ViewToggler
                    viewMode={this.props.viewMode}
                    setViewMode={this.props.setViewMode}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"l-map -header -relative"}>
            <SitesMap markerCluster slug={this.props.selected} id="sites-page-map" />
          </div>
        </div>
      );
    }
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
  viewMode: React.PropTypes.string,
  routeParams: React.PropTypes.object
};

export default withRouter(SitesPage);

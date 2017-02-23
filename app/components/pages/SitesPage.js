import React from 'react';
import ViewToggler from 'components/common/ViewToggler';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';

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
    return (
      <div className="l-page">
        <div className="l-navigation -fixed">
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
        <div className={`l-mask ${this.props.viewMode}`}>
          <div className={"l-map -header"}>
            <SitesMap markerCluster slug={this.props.selected} id="sites-page-map" />
          </div>
          <div className="l-table">
            <div className="row">
              <div className="column c-table -fixed -static -static-offset">
                <SitesTable />
              </div>
            </div>
          </div>
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

export default SitesPage;

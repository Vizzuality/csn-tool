import React from 'react';
import ViewToggler from 'components/common/ViewToggler';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';

class SitesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false
    };
    this.listPage = 0;
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentWillMount() {
    this.props.setViewMode('map');
    this.getData(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getData(newProps);
    // 200 is the row per page in the request
    if (newProps.list.length < 200) {
      this.setState({ tableLoading: false });
    } else {
      this.setState({ tableLoading: true });
    }
  }

  componentWillUnmount() {
    this.props.clearSites();
  }

  onEndReached() {
    this.listPage = this.listPage + 1;
    this.props.getSitesList(this.listPage);
  }

  getData(props) {
    if (props.viewMode === 'list' && !props.list) {
      props.getSitesList(this.listPage);
    } else if (props.viewMode === 'map' && !props.locations) {
      props.getSitesLocations();
    }
  }

  render() {
    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column">
              <div className="navigation-wrapper">
                <div className="c-navigation">
                  <div className="content">
                    <div className="title">
                      <h2>Sites</h2>
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
            <SitesMap slug={this.props.selected} />
          </div>
          <div className="l-table">
            <div className="row">
              <div className="column">
                {this.props.viewMode === 'list' &&
                  <SitesTable
                    data={this.props.list}
                    slug={this.props.selected}
                    category={this.props.category}
                    endReached={this.onEndReached}
                    clearSites={this.clearSites}
                    loading={this.state.tableLoading}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SitesPage.propTypes = {
  clearSites: React.PropTypes.func.isRequired,
  getSitesLocations: React.PropTypes.func.isRequired,
  getSitesList: React.PropTypes.func.isRequired,
  setViewMode: React.PropTypes.func.isRequired,
  list: React.PropTypes.any,
  selected: React.PropTypes.string,
  category: React.PropTypes.string,
  viewMode: React.PropTypes.string
};

export default SitesPage;

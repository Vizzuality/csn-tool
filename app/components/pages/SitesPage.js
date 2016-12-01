import React from 'react';
import NavLink from 'containers/common/NavLink';
import ViewToggler from 'components/common/ViewToggler';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';
import { unslug } from 'helpers/string';

class SitesPage extends React.Component {
  constructor(props) {
    super(props);
    this.listPage = 0;
    this.onEndReached = this.onEndReached.bind(this);
    this.clearSites = this.onClearSites.bind(this);
  }

  componentWillMount() {
    this.getData(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getData(newProps);
  }

  onEndReached() {
    this.listPage = this.listPage + 1;
    this.props.getSitesList(this.listPage);
  }

  onClearSites() {
    this.listPage = 0;
    this.props.clearSites();
  }

  getData(props) {
    if (props.selected && !props.data) {
      props.getSitesData(props.selected, props.category);
    } else if (!props.selected) {
      if (props.viewMode === 'list' && !props.list) {
        props.getSitesList(this.listPage);
      }
      if (props.viewMode === 'map' && !props.locations) {
        props.getSitesLocations();
      }
    }
  }

  render() {
    return (
      <div className="l-page">
        <div className="l-navigation">
          <div className="row">
            <div className="column">
              {this.props.selected ?
                <div className="navigation-wrapper">
                  <div className="c-navigation">
                    <div className="content">
                      <div className="title">
                        <NavLink className="breadcrumb" to="/sites" i18nText="backToSites" />
                        <h2>{unslug(this.props.selected)}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              : <div className="navigation-wrapper">
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
              }
            </div>
          </div>
        </div>
        <div className={`${this.props.selected ? 'l-page' : `l-mask ${this.props.viewMode}`}`}>
          <div className={`l-map -header ${this.props.selected ? '-short' : ''}`}>
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
  getSitesData: React.PropTypes.func.isRequired,
  setViewMode: React.PropTypes.func.isRequired,
  list: React.PropTypes.any,
  selected: React.PropTypes.string,
  category: React.PropTypes.string,
  viewMode: React.PropTypes.string
};

export default SitesPage;

import React from 'react';
import ViewToggler from 'components/sites/ViewToggler';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';
import { replaceUrlParams } from 'helpers/router';
import Select from 'react-select';
import { withRouter } from 'react-router';

const FILTER_OPTIONS = [
  { value: 'iba', label: 'IBA' },
  { value: 'csn', label: 'CSN' }
];

class SitesPage extends React.Component {
  constructor() {
    super();
    this.onSelectChange = this.onSelectChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.props.getSitesLocations(this.props.router.location.query.filter);
    this.props.getSitesList(0, null, this.props.router.location.query.filter);
  }

  componentWillReceiveProps(newProps) {
    this.getData(newProps);
  }

  componentWillUnmount() {
    this.props.clearSites();
  }

  onSelectChange(filter) {
    const params = {
      filter: filter.value
    };
    const route = this.props.router.getCurrentLocation();
    const url = replaceUrlParams(route.pathname + route.search, params);
    this.props.router.push(url);
  }

  getData(props) {
    if (props.filter !== this.props.filter || props.viewMode !== this.props.viewMode) {
      props.getSitesLocations(props.router.location.query.filter);
      props.getSitesList(0, null, props.router.location.query.filter);
    }
  }

  render() {
    return (
      <div className="l-page">
        <div className={`l-navigation ${this.props.viewMode === 'list' ? '-dark' : ''} `}>
          <div className="row">
            <div className="column">
              <div className="navigation-wrapper">
                <div className="c-navigation -filters">
                  <div className="content">
                    <div className="title">
                      <h2>{this.context.t('sites')}</h2>
                    </div>
                  </div>
                  <div className="filter">
                    <Select
                      name="filter-sites"
                      className="c-select -plain"
                      clearable={false}
                      searchable={false}
                      value={this.props.router.location.query.filter}
                      options={FILTER_OPTIONS}
                      onChange={this.onSelectChange}
                      arrowRenderer={() => <svg className="icon"><use xlinkHref="#icon-dropdown_arrow_down"></use></svg>}
                    />
                  </div>
                  <ViewToggler viewMode={this.props.viewMode} />
                </div>
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
  viewMode: React.PropTypes.string,
  router: React.PropTypes.object
};

export default withRouter(SitesPage);

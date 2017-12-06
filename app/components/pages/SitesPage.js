import React from 'react';
import PropTypes from 'prop-types';
import ViewToggler from 'components/sites/ViewToggler';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';
import { replaceUrlParams } from 'helpers/router';
import Select from 'react-select';
import { withRouter } from 'react-router';

class SitesPage extends React.Component {
  constructor() {
    super();
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillMount() {
    this.props.getSitesLocations(this.props.filter);
    this.props.getSitesList(0, null, this.props.filter);
  }

  componentWillReceiveProps(props) {
    if (props.filter !== this.props.filter || props.viewMode !== this.props.viewMode) {
      props.getSitesLocations(props.filter);
      props.getSitesList(0, null, props.filter);
    }
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

  render() {
    const FILTER_OPTIONS = [
      { value: 'iba', label: this.context.t('iba') },
      { value: 'csn', label: this.context.t('criticalSites') }
    ];

    return (
      <div className="l-page">
        <div className={`l-navigation ${this.props.viewMode === 'list' ? '-dark' : ''} `}>
          <div className="row">
            <div className="column c-navigation">
              <div className="content -filters">
                <div className="title">
                  <h2>{this.context.t('sites')}</h2>
                </div>
                <div className="filter">
                  <h4 className="text -input-label -light">{this.context.t('typeOfSite')}</h4>
                  <Select
                    name="filter-sites"
                    className="c-select -long"
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
  t: PropTypes.func.isRequired
};

SitesPage.propTypes = {
  clearSites: PropTypes.func.isRequired,
  getSitesLocations: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
  selected: PropTypes.string,
  viewMode: PropTypes.string,
  router: PropTypes.object,
  getSitesList: PropTypes.func,
  filter: PropTypes.string
};

export default withRouter(SitesPage);

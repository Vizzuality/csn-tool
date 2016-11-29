import React from 'react';
import NavLink from 'containers/common/NavLink';
import ViewToggler from 'components/common/ViewToggler';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';
import { unslug } from 'helpers/string';

class SitesPage extends React.Component {
  componentWillMount() {
    this.getData(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getData(newProps);
  }

  getData(props) {
    if (props.selected) {
      props.getSitesData(props.selected, props.category);
    } else if (!props.list) {
      props.getSitesList();
    }
  }

  render() {
    return (
      <div className={`l-page ${this.props.viewMode}`}>
        <div className="l-navigation">
          <div className="row">
            <div className="column">
              <div className="navigation-wrapper">
                {this.props.selected &&
                  <div className="c-navigation">
                    <NavLink className="breadcrumb" to="/sites" i18nText="backToSites" />
                    <h2>{unslug(this.props.selected)}</h2>
                  </div>
                }
                <ViewToggler
                  viewMode={this.props.viewMode}
                  setViewMode={this.props.setViewMode}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`l-mask ${this.props.viewMode}`}>
          <div className="l-map -species-detail">
            <SitesMap slug={this.props.selected} />
          </div>

          <div className="l-table">
            <div className="row">
              <div className="column">
                <SitesTable data={this.props.list} slug={this.props.selected} category={this.props.category} />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

SitesPage.propTypes = {
  getSitesList: React.PropTypes.func.isRequired,
  getSitesData: React.PropTypes.func.isRequired,
  setViewMode: React.PropTypes.func.isRequired,
  list: React.PropTypes.any,
  selected: React.PropTypes.string,
  category: React.PropTypes.string,
  viewMode: React.PropTypes.string
};

export default SitesPage;

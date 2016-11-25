import React from 'react';
import NavLink from 'containers/common/NavLink';
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
      <div className="l-page">
        {this.props.selected
          ? <div className="l-navigation">
            <div className="row">
              <div className="column c-navigation">
                <div>
                  <NavLink className="breadcrumb" to="/sites" i18nText="backToSites" />
                  <h2>{unslug(this.props.selected)}</h2>
                </div>
              </div>
            </div>
          </div>
          : ''
        }
        <div className="l-map -species-detail">
          <SitesMap slug={this.props.selected} />
        </div>
        <div className="l-content row">
          <div className="column">
            <SitesTable data={this.props.list} slug={this.props.selected} category={this.props.category} />
          </div>
        </div>
      </div>
    );
  }
}

SitesPage.propTypes = {
  getSitesList: React.PropTypes.func.isRequired,
  getSitesData: React.PropTypes.func.isRequired,
  list: React.PropTypes.any,
  selected: React.PropTypes.string,
  category: React.PropTypes.string
};

export default SitesPage;

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
    if (!props.data) {
      if (props.selected) {
        props.getSitesDetail(props.selected);
      } else {
        props.getSitesList();
      }
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
            <SitesTable />
          </div>
        </div>
      </div>
    );
  }
}

SitesPage.propTypes = {
  getSitesList: React.PropTypes.func.isRequired,
  getSitesDetail: React.PropTypes.func.isRequired,
  data: React.PropTypes.any,
  selected: React.PropTypes.string
};

export default SitesPage;

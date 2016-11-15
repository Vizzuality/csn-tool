import React from 'react';
import SitesMap from 'components/maps/SitesMap';
import LoadingSpinner from 'components/common/LoadingSpinner';
import TableList from 'containers/tables/TableList';

class SitesPage extends React.Component {
  componentWillMount() {
    if (!this.props.sites.length) {
      this.props.getSitesList();
    }
  }

  getContent() {
    return (
      <div>
        <SitesMap sites={this.props.sites} />
        <div className="l-content row">
          <div className="column">
            <TableList
              data={this.props.sites}
              columns={['site_name', 'iso3']}
            />
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="l-page">
        {!this.props.sites.length
          ? <LoadingSpinner transparent />
          : this.getContent()
        }
      </div>
    );
  }
}

SitesPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SitesPage.propTypes = {
  getSitesList: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array
};

export default SitesPage;

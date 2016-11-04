import React from 'react';
import SitesMap from 'components/maps/SitesMap';
import LoadingSpinner from 'components/common/LoadingSpinner';

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
        <div className="row">
          <div className="column">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.props.sites.map((site, index) => (
                  <tr key={index}>
                    <td>{site.site_name}</td>
                    <td><a href={site.hyperlink} target="_blank">View more</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="l-page">
        <div className="row">
          <div className="column">
            <h2>{this.context.t('sites')}</h2>
          </div>
        </div>
        <div className="l-page-content">
          {!this.props.sites.length
            ? <LoadingSpinner transparent />
            : this.getContent()
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
  getSitesList: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array
};

export default SitesPage;

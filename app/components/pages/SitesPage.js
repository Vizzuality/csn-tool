import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';

class SitesPage extends React.Component {
  componentWillMount() {
    if (!this.props.sites.length) {
      this.props.getSitesList();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <h2>{this.context.t('sites')}</h2>
          {!this.props.sites.length
            ? <LoadingSpinner transparent />
            : <table>
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

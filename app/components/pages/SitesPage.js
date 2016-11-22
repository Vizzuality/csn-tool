import React from 'react';
import SitesMap from 'containers/sites/SitesMap';
import SitesTable from 'containers/sites/SitesTable';

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
        <SitesMap />
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
  data: React.PropTypes.any
};

export default SitesPage;

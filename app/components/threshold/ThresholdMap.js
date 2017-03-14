import React from 'react';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';

class ThresholdMap extends BasicMap {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.remove();
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={this.props.id} className="c-map -full"></div>
      </div>
    );
  }
}

ThresholdMap.propTypes = {
  onMapClick: React.PropTypes.func.isRequired,
  latLng: React.PropTypes.object
};

export default withRouter(ThresholdMap);

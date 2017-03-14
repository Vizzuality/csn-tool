import React from 'react';
import ThresholdMap from 'containers/threshold/ThresholdMap';

class ThresholdLookupPage extends React.Component {
  render() {
    return (
      <div className="l-container -map">
        <ThresholdMap id="threshold-map" />
      </div>
    );
  }
}

ThresholdLookupPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

ThresholdLookupPage.propTypes = {
  latLng: React.PropTypes.object
};

export default ThresholdLookupPage;

import { connect } from 'react-redux';
import { setLocation } from 'actions/threshold';
import ThresholdMap from 'components/threshold/ThresholdMap';

const mapStateToProps = (state) => ({
  latLng: state.threshold.latLng
});

const mapDispatchToProps = (dispatch) => ({
  onMapClick: (latLng) => dispatch(setLocation(latLng))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThresholdMap);

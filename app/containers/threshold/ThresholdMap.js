import { connect } from 'react-redux';
import ThresholdMap from 'components/threshold/ThresholdMap';

const mapStateToProps = (state) => ({
  coordinates: state.threshold.coordinates,
  data: state.threshold.list || [],
  layers: state.threshold.layers
});

export default connect(mapStateToProps, null)(ThresholdMap);

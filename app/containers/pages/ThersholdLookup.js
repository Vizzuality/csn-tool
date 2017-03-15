import { connect } from 'react-redux';
import ThresholdLookupPage from 'components/pages/ThresholdLookupPage';

const mapStateToProps = (state) => ({
  coordinates: state.threshold.coordinates,
  data: state.threshold.data
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(ThresholdLookupPage);

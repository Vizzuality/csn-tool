import { connect } from 'react-redux';
import ThresholdLookupPage from 'components/pages/ThresholdLookupPage';

const mapStateToProps = (state) => ({
  latLng: state.threshold.latLng
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(ThresholdLookupPage);

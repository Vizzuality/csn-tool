import { connect } from 'react-redux';
import ThresholdLookupPage from 'components/pages/ThresholdLookupPage';

const mapStateToProps = (state) => ({
  coordinates: state.threshold.coordinates,
  data: state.threshold.data && state.threshold.data.length > 0,
  country: state.threshold.data && state.threshold.data.length > 0 ? state.threshold.data[0].country_name : null
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(ThresholdLookupPage);

import { connect } from 'react-redux';
import ThresholdLookupPage from 'components/pages/ThresholdLookupPage';

const mapStateToProps = (state) => ({
  coordinates: state.threshold.coordinates,
  data: state.threshold.list && state.threshold.list.length > 0,
  country: state.threshold.list && state.threshold.list.length > 0 ? state.threshold.list[0].country_name : null
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(ThresholdLookupPage);

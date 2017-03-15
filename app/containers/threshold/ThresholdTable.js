import { connect } from 'react-redux';
import ThresholdTable from 'components/threshold/ThresholdTable';
import { getSitesList } from 'actions/sites';

const mapStateToProps = (state) => ({
  data: state.threshold.data || [],
  columns: ['populations', 'a', 'b', 'c', 'flyway_range',
    'year_start', 'year_end', 'size_min', 'size_max', 'ramsar']
});

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search) => dispatch(getSitesList(page, search))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThresholdTable);

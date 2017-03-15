import { connect } from 'react-redux';
import SearchFilter from 'components/common/SearchFilter';
import { setThresholdTableFilter } from 'actions/threshold';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setSearchFilter: (search) => dispatch(setThresholdTableFilter(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);

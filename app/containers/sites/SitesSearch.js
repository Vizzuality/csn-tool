import { connect } from 'react-redux';
import SearchFilter from 'components/common/SearchFilter';
import { setSearchFilter } from 'actions/sites';

const mapStateToProps = (state) => ({
  searchFilter: state.sites.searchFilter
});

const mapDispatchToProps = (dispatch) => ({
  setSearchFilter: (search) => dispatch(setSearchFilter(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);

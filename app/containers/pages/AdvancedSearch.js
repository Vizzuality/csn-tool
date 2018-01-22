import { connect } from 'react-redux';
import AdvancedSearch from 'components/pages/AdvancedSearchPage';
import { getSearchOptions, getSearchResults } from 'actions/search';

const mapStateToProps = (state) => ({
  options: state.search.options,
  data: state.search.list,
  isFetching: state.search.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  getOptions: () => dispatch(getSearchOptions()),
  onSearch: (category, filters) => dispatch(getSearchResults(category, filters))
});


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);

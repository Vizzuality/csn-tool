import { connect } from 'react-redux';
import AdvancedSearch from 'components/pages/AdvancedSearchPage';
import { getSearchOptions, getSearchResults } from 'actions/search';

const mapStateToProps = (state) => ({
  options: state.search.options,
  hasResults: state.search.results !== null && Object.keys(state.search.results).length > 0
});

const mapDispatchToProps = (dispatch) => ({
  getOptions: () => dispatch(getSearchOptions()),
  onSearch: (category, filters) => dispatch(getSearchResults(category, filters))
});


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);

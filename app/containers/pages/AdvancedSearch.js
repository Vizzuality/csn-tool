import { connect } from 'react-redux';
import AdvancedSearch from 'components/pages/AdvancedSearchPage';
import { getSearchOptions } from 'actions/search';

const mapStateToProps = (state) => ({
  options: state.search.options
});

const mapDispatchToProps = (dispatch) => ({
  getOptions: () => dispatch(getSearchOptions())
});


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);

import { connect } from 'react-redux';
import AdvancedSearch from 'components/pages/AdvancedSearchPage';
import { getSearchOptions, getSearchResults } from 'actions/search';
import {
  ALL_SPECIES_COLUMNS,
  DEFAULT_SPECIES_COLUMNS
} from 'constants/tables';

const mapStateToProps = (state) => ({
  options: state.search.options,
  data: state.search.list,
  isFetching: state.search.isFetching,
  columns: DEFAULT_SPECIES_COLUMNS.over,
  allColumns: ALL_SPECIES_COLUMNS.over
});

const mapDispatchToProps = (dispatch) => ({
  getOptions: () => dispatch(getSearchOptions()),
  onSearch: (category, filters) => dispatch(getSearchResults(category, filters))
});


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);

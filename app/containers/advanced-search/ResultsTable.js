import { connect } from 'react-redux';
// import ResultsTable from 'components/advanced-search/ResultsTable';
import ResultsTable from 'components/advanced-search/ResultsTableVirtualized';

const mapStateToProps = (state) => ({
  data: state.search.results.rows,
  columns: state.search.results.fields ? Object.keys(state.search.results.fields) : []
});

export default connect(mapStateToProps)(ResultsTable);
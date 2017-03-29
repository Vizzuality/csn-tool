import { connect } from 'react-redux';
import ResultsTable from 'components/advanced-search/ResultsTable';

const mapStateToProps = (state) => {
  const columns = ['label', 'value'];
  return {
    data: state.search.results,
    columns
  };
};

export default connect(mapStateToProps)(ResultsTable);

import { connect } from 'react-redux';
import SearchTable from 'components/advanced-search/SearchTable';
import { filterData } from 'helpers/filters';

const mapStateToProps = (state) => {
  const columns = state.search.columns;
  const filter = state.search.search;
  const data = state.search.list;

  return {
    data: filterData({ data, columns, filter }),
    category: state.search.selectedCategory,
    columns,
    allColumns: state.search.allColumns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);

import { connect } from 'react-redux';
import SearchTable from 'components/advanced-search/SearchTable';
import { filterData } from 'helpers/filters';

const mapStateToProps = (state) => {
  const columns = state.search.columns;
  const columnFilter = state.search.columnFilter;
  const filter = state.search.searchFilter;
  const data = state.search.list;

  return {
    data: filterData({ data, columns, filter, columnFilter }),
    category: state.search.selectedCategory,
    columns,
    allColumns: state.search.allColumns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);

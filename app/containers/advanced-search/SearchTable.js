import { connect } from 'react-redux';
import SearchTable from 'components/advanced-search/SearchTable';
import { filterColumnsBasedOnLanguage } from 'helpers/language';
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
    allColumns: filterColumnsBasedOnLanguage(state.search.allColumns, state.i18nState.lang)
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);

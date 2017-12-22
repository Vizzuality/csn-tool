import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setSearchTableSort, setSearchColumnFilter } from 'actions/search';
import { changeColumnActivation } from 'actions/common';
import { TABLES } from 'constants/tables';

const mapStateToProps = (state) => ({
  selectedCategory: state.search.selectedCategory,
  sort: state.search.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setSearchTableSort(sort)),
  filterBy: (filter) => dispatch(setSearchColumnFilter(filter)),
  changeColumnActivation: (column) => dispatch(changeColumnActivation(column, TABLES.SEARCH))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

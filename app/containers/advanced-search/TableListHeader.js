import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setSearchTableSort } from 'actions/search';
import { changeColumnActivation } from 'actions/common';

const mapStateToProps = (state) => ({
  selectedCategory: state.search.selectedCategory,
  sort: state.search.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setSearchTableSort(sort)),
  filterBy: () => {},
  changeColumnActivation: (column) => dispatch(changeColumnActivation(column, 'search'))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

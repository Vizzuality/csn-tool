import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setSitesTableSort, setSitesTableFilter } from 'actions/sites';
import { changeColumnActivation } from 'actions/common';

const mapStateToProps = (state) => ({
  selectedCategory: state.sites.selectedCategory,
  sort: state.sites.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setSitesTableSort(sort)),
  filterBy: (filter) => dispatch(setSitesTableFilter(filter)),
  changeColumnActivation: (column) => dispatch(changeColumnActivation(column))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

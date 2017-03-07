import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setSitesTableSort, setSitesTableFilter } from 'actions/sites';

const mapStateToProps = (state) => ({
  selectedCategory: state.sites.selectedCategory,
  sort: state.sites.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setSitesTableSort(sort)),
  filterBy: (filter) => dispatch(setSitesTableFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

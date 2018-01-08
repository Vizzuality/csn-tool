import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setCountriesTableSort, setCountriesTableFilter } from 'actions/countries';
import { changeColumnActivation } from 'actions/common';
import { TABLES } from 'constants/tables';

const mapStateToProps = (state, ownProps) => ({
  selectedCategory: ownProps.selectedCategory || state.countries.selectedCategory,
  sort: state.countries.sort,
  filter: state.countries.filter
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setCountriesTableSort(sort)),
  filterBy: (filter) => dispatch(setCountriesTableFilter(filter)),
  changeColumnActivation: (column) => dispatch(changeColumnActivation(column, TABLES.COUNTRIES))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

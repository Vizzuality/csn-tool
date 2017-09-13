import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setCountriesTableSort, setCountriesTableFilter } from 'actions/countries';
import { changeColumnActivation } from 'actions/common';

const mapStateToProps = (state, ownProps) => ({
  selectedCategory: ownProps.selectedCategory || state.countries.selectedCategory,
  sort: state.countries.sort,
  filter: state.countries.filter
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setCountriesTableSort(sort)),
  filterBy: (filter) => dispatch(setCountriesTableFilter(filter)),
  changeColumnActivation: (column, expanded) => dispatch(changeColumnActivation(column, expanded))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

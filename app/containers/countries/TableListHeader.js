import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setCountriesTableSort, setCountriesTableFilter } from 'actions/countries';

const mapStateToProps = (state) => ({
  sort: state.countries.sort,
  filter: state.countries.filter
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setCountriesTableSort(sort)),
  filterBy: (filter) => dispatch(setCountriesTableFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

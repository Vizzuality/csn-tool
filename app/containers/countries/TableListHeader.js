import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setCountriesTableSort } from 'actions/countries';

const mapStateToProps = (state) => ({
  sort: state.countries.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setCountriesTableSort(sort))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

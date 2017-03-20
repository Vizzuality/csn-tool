import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setSpeciesTableSort, setSpeciesFilter } from 'actions/species';

const mapStateToProps = (state) => ({
  sort: state.threshold.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setSpeciesTableSort(sort)),
  filterBy: (filter) => dispatch(setSpeciesFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

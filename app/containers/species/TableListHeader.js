import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setSpeciesTableSort } from 'actions/species';

const mapStateToProps = (state) => ({
  sort: state.species.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setSpeciesTableSort(sort))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setSpeciesTableSort, setSpeciesFilter } from 'actions/species';
import { changeColumnActivation } from 'actions/common';
import { TABLES } from 'constants/tables';

const mapStateToProps = (state) => ({
  selectedCategory: state.species.selectedCategory,
  sort: state.species.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setSpeciesTableSort(sort)),
  filterBy: (filter) => dispatch(setSpeciesFilter(filter)),
  changeColumnActivation: (column) => dispatch(changeColumnActivation(column, TABLES.SPECIES))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

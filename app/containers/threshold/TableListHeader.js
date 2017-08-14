import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setThresholdTableSort, setThresholdColumnFilter } from 'actions/threshold';
import { changeColumnActivation } from 'actions/common';

const mapStateToProps = (state) => ({
  sort: state.threshold.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setThresholdTableSort(sort)),
  filterBy: (filter) => dispatch(setThresholdColumnFilter(filter)),
  changeColumnActivation: (column) => dispatch(changeColumnActivation(column))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

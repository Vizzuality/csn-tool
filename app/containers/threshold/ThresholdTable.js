import { connect } from 'react-redux';
import ThresholdTable from 'components/threshold/ThresholdTable';
import { getSitesList } from 'actions/sites';
import { filterData } from 'helpers/filters';

const mapStateToProps = ({ threshold: { list, allColumns, columns, searchFilter, columnFilter } }) => ({
  data: filterData({ data: list, columns, filter: searchFilter, columnFilter }),
  allColumns,
  columns
});

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search) => dispatch(getSitesList(page, search))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThresholdTable);

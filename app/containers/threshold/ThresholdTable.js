import { connect } from 'react-redux';
import ThresholdTable from 'components/threshold/ThresholdTable';
import { getSitesList } from 'actions/sites';
import { filterData } from 'helpers/filters';

const mapStateToProps = (state) => {
  const threshold = state.threshold;
  const columns = threshold.columns;
  const data = threshold.list;

  return {
    data: filterData({ data, columns, filter: threshold.searchFilter, columnFilter: threshold.columnFilter }),
    columns,
    allColumns: threshold.allColumns
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search) => dispatch(getSitesList(page, search))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThresholdTable);

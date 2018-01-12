import { connect } from 'react-redux';
import ThresholdTable from 'components/threshold/ThresholdTable';
import { getSitesList } from 'actions/sites';
import { filterColumnsBasedOnLanguage } from 'helpers/language';
import { filterData } from 'helpers/filters';

const mapStateToProps = (state) => {
  const { list, allColumns, columns, searchFilter, columnFilter } = state.threshold;

  return {
    data: filterData({ data: list, columns, filter: searchFilter, columnFilter }),
    allColumns: filterColumnsBasedOnLanguage(allColumns, state.i18nState.lang),
    columns
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search) => dispatch(getSitesList(page, search))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThresholdTable);

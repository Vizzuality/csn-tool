import { connect } from 'react-redux';
import ThresholdTable from 'components/threshold/ThresholdTable';
import { getSitesList } from 'actions/sites';
import { filterByColumns } from 'helpers/filters';

function getThresholdData(threshold, columns) {
  const data = threshold.data || false;
  if (!data) return data;

  let filteredData = data;
  if (threshold.columnFilter && Object.keys(threshold.columnFilter).length !== 0) {
    filteredData = filterByColumns(filteredData, threshold.columnFilter);
  }

  if (threshold.searchFilter) {
    filteredData = data.filter((item) => {
      let match = false;
      const modItem = item;
      const searchFilter = threshold.searchFilter.toLowerCase();

      for (let i = 0, cLength = columns.length; i < cLength; i++) {
        if (typeof modItem[columns[i]] === 'string' && modItem[columns[i]].toLowerCase().indexOf(searchFilter) >= 0) {
          modItem[columns[i]] = modItem[columns[i]].toLowerCase().replace(searchFilter, `<span class="filtered">${searchFilter}</span>`);
          match = true;
          break;
        }
      }
      return match;
    });
  }

  return filteredData;
}

const mapStateToProps = (state) => {
  const columns = ['scientific_name', 'english_name', 'iucn_category',
    'population', 'a', 'b',
    'c', 'caf_action_plan', 'eu_birds_directive', 'flyway_range', 'year_start',
    'year_end', 'size_min', 'size_max', 'ramsar_criterion'];
  return {
    data: getThresholdData(state.threshold, columns),
    columns
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search) => dispatch(getSitesList(page, search))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThresholdTable);

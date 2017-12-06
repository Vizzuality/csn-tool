import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';
import { getSitesList } from 'actions/sites';
import { filterBySearch } from 'helpers/filters';

function getSitesData(rows, filter, columns) {
  if (!rows) return [];
  const data = rows.slice();

  const searchFilter = (typeof filter === 'string') && filter.toLowerCase();

  let filteredData = data;
  if (searchFilter) {
    filteredData = filterBySearch(data, searchFilter, columns);
  }

  return filteredData;
}

const mapStateToProps = (state) => {
  const columns = state.sites.columns;

  const data = state.search.results ?
    { data: getSitesData(state.search.results.rows, state.search.search, columns), hasMore: false } :
    state.sites.list;

  return {
    filter: state.sites.filter,
    selected: state.sites.selected,
    category: state.sites.selectedCategory,
    type: state.sites.type,
    isSearch: state.search.results && state.search.results.rows && state.search.results.rows.length > 0 || false,
    list: data,
    columns,
    allColumns: state.sites.allColumns
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search, filter) => dispatch(getSitesList(page, search, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesTable);

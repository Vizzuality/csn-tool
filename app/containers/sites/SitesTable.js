import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';
import { getSitesList } from 'actions/sites';
import { filterData } from 'helpers/filters';

const mapStateToProps = (state) => {
  const columns = state.sites.columns;

  const data = state.search.results
    ? { data: filterData({ data: state.search.results.rows, filter: state.search.search, columns }), hasMore: false }
    : state.sites.list;

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

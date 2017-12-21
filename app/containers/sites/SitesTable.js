import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';
import { getSitesList } from 'actions/sites';

const mapStateToProps = (state) => (
  {
    filter: state.sites.filter,
    selected: state.sites.selected,
    category: state.sites.selectedCategory,
    type: state.sites.type,
    list: state.sites.list,
    columns: state.sites.columns,
    allColumns: state.sites.allColumns
  }
);

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search, filter) => dispatch(getSitesList(page, search, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesTable);

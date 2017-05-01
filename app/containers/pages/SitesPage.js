import { connect } from 'react-redux';
import SitesPage from 'components/pages/SitesPage';
import { getSitesLocations, setViewMode, clearSites, getSitesList } from 'actions/sites';

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  category: state.sites.selectedCategory,
  locations: state.sites.locations.length >= 0,
  viewMode: state.sites.viewMode,
  filter: state.sites.filter,
  type: state.sites.type
});

const mapDispatchToProps = (dispatch) => ({
  getSitesLocations: (type) => dispatch(getSitesLocations(type)),
  getSitesList: (page, search, filter) => dispatch(getSitesList(page, search, filter)),
  setViewMode: (viewMode) => dispatch(setViewMode(viewMode)),
  clearSites: () => dispatch(clearSites())
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);

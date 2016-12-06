import { connect } from 'react-redux';
import SitesPage from 'components/pages/SitesPage';
import { getSitesLocations, setViewMode, clearSites } from 'actions/sites';

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  category: state.sites.selectedCategory,
  locations: state.sites.locations.length >= 0,
  viewMode: state.sites.viewMode
});

const mapDispatchToProps = (dispatch) => ({
  getSitesLocations: () => dispatch(getSitesLocations()),
  setViewMode: (viewMode) => dispatch(setViewMode(viewMode)),
  clearSites: () => dispatch(clearSites())
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);

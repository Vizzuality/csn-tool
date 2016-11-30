import { connect } from 'react-redux';
import SitesPage from 'components/pages/SitesPage';
import { getSitesList, getSitesLocations, getSitesSpecies, getSitesThreats, setViewMode } from 'actions/sites';

function getSitesData(sites) {
  return sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
    ? sites[sites.selectedCategory][sites.selected]
    : false;
}

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  category: state.sites.selectedCategory,
  list: state.sites.list.length >= 0,
  locations: state.sites.locations.length >= 0,
  data: getSitesData(state.sites),
  viewMode: state.sites.viewMode
});

const mapDispatchToProps = (dispatch) => ({
  getSitesList: () => dispatch(getSitesList()),
  getSitesLocations: () => dispatch(getSitesLocations()),
  getSitesData: (id, category) => {
    switch (category) {
      case 'threats':
        dispatch(getSitesThreats(id));
        break;
      case 'species':
        dispatch(getSitesSpecies(id));
        break;
      default:
        dispatch(getSitesSpecies(id));
        break;
    }
  },
  setViewMode: (viewMode) => dispatch(setViewMode(viewMode))
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);

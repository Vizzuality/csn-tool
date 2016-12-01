import { connect } from 'react-redux';
import SitesPage from 'components/pages/SitesPage';
import { getSitesStats, getSitesList, getSitesLocations, getSitesSpecies, getSitesHabitats,
  getSitesPopulations, getSitesThreats, setViewMode, clearSites } from 'actions/sites';

function getSitesData(sites) {
  return sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
    ? sites[sites.selectedCategory][sites.selected]
    : false;
}

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  category: state.sites.selectedCategory,
  stats: state.sites.stats || false,
  list: state.sites.list,
  locations: state.sites.locations.length >= 0,
  data: getSitesData(state.sites),
  viewMode: state.sites.viewMode
});

const mapDispatchToProps = (dispatch) => ({
  getSitesStats: id => dispatch(getSitesStats(id)),
  getSitesList: (page) => dispatch(getSitesList(page)),
  getSitesLocations: () => dispatch(getSitesLocations()),
  getSitesData: (id, category) => {
    switch (category) {
      case 'populations':
        dispatch(getSitesPopulations(id));
        break;
      case 'habitats':
        dispatch(getSitesHabitats(id));
        break;
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
  setViewMode: (viewMode) => dispatch(setViewMode(viewMode)),
  clearSites: () => dispatch(clearSites())
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);

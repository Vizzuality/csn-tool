import { connect } from 'react-redux';
import SitesPage from 'components/pages/SitesPage';
import { getSitesList, getSitesSpecies, getSitesThreats, setViewMode } from 'actions/sites';

function getSitesData(sites) {
  return sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
    ? sites[sites.selectedCategory][sites.selected]
    : false;
}

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  category: state.sites.selectedCategory,
  list: state.sites.list,
  data: getSitesData(state.sites),
  viewMode: state.sites.viewMode
});

const mapDispatchToProps = (dispatch) => ({
  getSitesList: () => dispatch(getSitesList()),
  getSitesData: (slug, category) => {
    switch (category) {
      case 'threats':
        dispatch(getSitesThreats(slug));
        break;
      case 'species':
        dispatch(getSitesSpecies(slug));
        break;
      default:
        dispatch(getSitesSpecies(slug));
        break;
    }
  },
  setViewMode: (viewMode) => dispatch(setViewMode(viewMode))
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);

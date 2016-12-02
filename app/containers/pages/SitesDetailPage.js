import { connect } from 'react-redux';
import SitesDetailPage from 'components/pages/SitesDetailPage';
import { getSitesStats, getSitesSpecies, getSitesHabitats,
  getSitesPopulations, getSitesThreats } from 'actions/sites';

function getSitesData(sites) {
  return sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
    ? sites[sites.selectedCategory][sites.selected]
    : false;
}

const mapStateToProps = (state) => ({
  site: state.sites.selected,
  category: state.sites.selectedCategory,
  stats: state.sites.stats,
  data: getSitesData(state.sites)
});

const mapDispatchToProps = (dispatch) => ({
  getSitesStats: id => dispatch(getSitesStats(id)),
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
      default:
        dispatch(getSitesSpecies(id));
        break;
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesDetailPage);

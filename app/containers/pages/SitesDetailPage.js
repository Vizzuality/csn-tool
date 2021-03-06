import { connect } from 'react-redux';
import SitesDetailPage from 'components/pages/SitesDetailPage';
import {
  getSitesStats,
  getSitesSpecies,
  getVulnerability
} from 'actions/sites';

function getSitesData(sites) {
  return sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
    ? sites[sites.selectedCategory][sites.selected]
    : false;
}

const mapStateToProps = (state) => ({
  site: state.sites.selected,
  category: state.sites.selectedCategory,
  stats: state.sites.stats,
  type: state.sites.type,
  data: getSitesData(state.sites)
});

const mapDispatchToProps = (dispatch) => ({
  getSitesStats: (id, type) => dispatch(getSitesStats(id, type)),
  getSitesData: (id, category, type) => {
    switch (category) {
      case 'csnVulnerability':
        dispatch(getVulnerability(id));
        break;
      default:
        dispatch(getSitesSpecies(id, type));
        break;
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesDetailPage);

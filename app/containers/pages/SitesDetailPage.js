import { connect } from 'react-redux';
import SitesDetailPage from 'components/pages/SitesDetailPage';
import { getSitesStats, getSitesSpecies,
  getSitesPopulations } from 'actions/sites';
import { setScrollState } from 'actions/scroll';

function getSitesData(sites) {
  return sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
    ? sites[sites.selectedCategory][sites.selected]
    : false;
}

const mapStateToProps = (state) => ({
  site: state.sites.selected,
  category: state.sites.selectedCategory,
  stats: state.sites.stats,
  data: getSitesData(state.sites),
  scroll: state.scroll.scroll,
  scrollLimit: state.scroll.scrollLimit
});

const mapDispatchToProps = (dispatch) => ({
  setScrollState: (bool) => dispatch(setScrollState(bool)),
  getSitesStats: id => dispatch(getSitesStats(id)),
  getSitesData: (id, category) => {
    switch (category) {
      case 'populations':
        dispatch(getSitesPopulations(id));
        break;
      default:
        dispatch(getSitesSpecies(id));
        break;
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesDetailPage);

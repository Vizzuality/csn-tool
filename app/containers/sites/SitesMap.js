import { connect } from 'react-redux';
import { goSiteDetail } from 'actions/sites';
import SitesMap from 'components/sites/SitesMap';

function getData(sites) {
  if (!sites.selected) return sites.locations;
  return sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
    ? sites[sites.selectedCategory][sites.selected].site
    : [];
}

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  data: getData(state.sites)
});

const mapDispatchToProps = (dispatch) => ({
  goToDetail: (id) => dispatch(goSiteDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesMap);

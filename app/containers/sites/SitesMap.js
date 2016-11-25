import { connect } from 'react-redux';
import { goSiteDetail } from 'actions/sites';
import SitesMap from 'components/sites/SitesMap';

function getData(sites) {
  if (!sites.selected) return sites.list;
  return sites.species[sites.selected] || [];
}

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  data: getData(state.sites)
});

const mapDispatchToProps = (dispatch) => ({
  goToDetail: (slug) => dispatch(goSiteDetail(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesMap);

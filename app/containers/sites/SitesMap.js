import { connect } from 'react-redux';
import { goSiteDetail } from 'actions/sites';
import SitesMap from 'components/sites/SitesMap';

function getSites(sites) {
  return !sites.selected ? sites.locations : [];
}

function getSelectedSite(sites) {
  if (!sites.selected) return null;

  if (sites.stats && sites.stats.site) return sites.stats.site[0];

  return null;
}

const mapStateToProps = (state) => ({
  selectedSite: getSelectedSite(state.sites),
  sites: getSites(state.sites)
});

const mapDispatchToProps = (dispatch) => ({
  goToDetail: (id, type) => dispatch(goSiteDetail(id, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesMap);

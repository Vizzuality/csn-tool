import { connect } from 'react-redux';
import { toggleLayer, goSiteDetail } from 'actions/sites';
import { commonToggleLayer } from 'actions/common';
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
  sites: getSites(state.sites),
  layers: state.sites.layers
});

const mapDispatchToProps = (dispatch) => ({
  goToDetail: (id, type) => dispatch(goSiteDetail(id, type)),
  onSwitchChange: (item) => dispatch(commonToggleLayer(item, toggleLayer)),
  onAewaLegendDisable: () => dispatch(commonToggleLayer('aewaExtent', toggleLayer))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesMap);

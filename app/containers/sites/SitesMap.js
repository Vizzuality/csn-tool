import { connect } from 'react-redux';
import { goSiteDetail } from 'actions/sites';
import SitesMap from 'components/sites/SitesMap';

function getData(sites) {
  if (!sites.selected) return sites.locations;
  if (sites.locations && sites.locations.length) {
    return sites.locations.filter(l => l.id === parseInt(sites.selected, 10));
  }
  return sites.stats ? sites.stats.site : [];
}

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  data: getData(state.sites),
  type: state.sites.type
});

const mapDispatchToProps = (dispatch) => ({
  goToDetail: (id, type) => dispatch(goSiteDetail(id, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesMap);

import { connect } from 'react-redux';
import SitesPage from 'components/pages/SitesPage';
import { getSitesList, getSitesDetail } from 'actions/sites';

function getData(sites) {
  if (!sites.selected) return sites.list;
  return sites.details[sites.selected] || false;
}

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  data: getData(state.sites)
});

const mapDispatchToProps = (dispatch) => ({
  getSitesList: () => dispatch(getSitesList()),
  getSitesDetail: (slug) => dispatch(getSitesDetail(slug))
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);

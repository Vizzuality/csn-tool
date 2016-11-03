import { connect } from 'react-redux';
import SitesPage from 'components/pages/SitesPage';
import { getSitesList } from 'actions/sites';

const mapStateToProps = (state) => ({
  sites: state.sites.sitesList
});

const mapDispatchToProps = (dispatch) => ({
  getSitesList: () => dispatch(getSitesList())
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);

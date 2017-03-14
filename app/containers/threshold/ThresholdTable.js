import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';
import { getSitesList } from 'actions/sites';

const mapStateToProps = (state) => {
  const columns = ['country', 'site_name', 'protection_status', 'csn', 'iba',
    'qualifying_species', 'iba_in_danger'];

  return {
    latLng: state.threshold.latLng,
    list: [],
    columns
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search) => dispatch(getSitesList(page, search))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesTable);

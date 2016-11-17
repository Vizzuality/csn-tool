import { connect } from 'react-redux';
import CountriesTable from 'components/countries/CountriesTable';
import { getCountrySites } from 'actions/countries';

const mapStateToProps = (state) => ({
  data: state.countries.countriesDetail
});

const mapDispatchToProps = (dispatch) => ({
  getCountrySites: (iso) => dispatch(getCountrySites(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

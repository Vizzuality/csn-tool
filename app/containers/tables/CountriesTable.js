import { connect } from 'react-redux';
import CountriesTable from 'components/tables/CountriesTable';
import { getCountryData } from 'actions/countries';

const mapStateToProps = (state, own) => ({
  data: state.countries.countriesDetail[own.country] || `${own.country} not found`
});

const mapDispatchToProps = (dispatch) => ({
  getCountryData: (iso) => dispatch(getCountryData(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

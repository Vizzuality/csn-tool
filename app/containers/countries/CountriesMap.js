import { connect } from 'react-redux';
import { getCountriesGeom, goCountryDetail } from 'actions/countries';
import CountriesMap from 'components/countries/CountriesMap';

const mapStateToProps = (state, own) => ({
  countriesGeom: state.countries.countriesGeom,
  countryDetail: state.countries.countriesDetail[own.country] || []
});

const mapDispatchToProps = (dispatch) => ({
  getCountriesGeom: () => dispatch(getCountriesGeom()),
  goCountryDetail: (iso) => dispatch(goCountryDetail(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesMap);

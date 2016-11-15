import { connect } from 'react-redux';
import { getCountriesGeo, goCountryDetail } from 'actions/countries';
import CountriesMap from 'components/maps/CountriesMap';

const mapStateToProps = (state, own) => ({
  countriesGeo: state.countries.countriesGeo,
  countryDetail: state.countries.countriesDetail[own.country] || []
});

const mapDispatchToProps = (dispatch) => ({
  getCountriesGeo: () => dispatch(getCountriesGeo()),
  goCountryDetail: (iso) => dispatch(goCountryDetail(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesMap);

import { connect } from 'react-redux';
import { getCountriesGeom, goCountryDetail } from 'actions/countries';
import CountriesMap from 'components/countries/CountriesMap';

const mapStateToProps = (state) => ({
  countriesGeom: state.countries.geoms,
  countryDetail: []
});

const mapDispatchToProps = (dispatch) => ({
  getCountriesGeom: () => dispatch(getCountriesGeom()),
  goCountryDetail: (iso) => dispatch(goCountryDetail(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesMap);

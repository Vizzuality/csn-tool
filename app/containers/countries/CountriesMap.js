import { connect } from 'react-redux';
import { getCountriesGeom, goCountryDetail } from 'actions/countries';
import CountriesMap from 'components/countries/CountriesMap';

const mapStateToProps = (state) => ({
  country: state.countries.selected,
  geoms: state.countries.geoms,
  data: state.countries.sites[state.countries.selected] || []
});

const mapDispatchToProps = (dispatch) => ({
  getGeoms: () => dispatch(getCountriesGeom()),
  goToDetail: (iso) => dispatch(goCountryDetail(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesMap);

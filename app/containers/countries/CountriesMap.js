import { connect } from 'react-redux';
import { getCountriesGeom, goCountryDetail } from 'actions/countries';
import { goSiteDetail } from 'actions/sites';
import CountriesMap from 'components/countries/CountriesMap';

const mapStateToProps = (state) => ({
  country: state.countries.selected,
  geoms: state.countries.geoms,
  data: state.countries.sites[state.countries.selected] || [],
  layers: state.countries.layers,
  scroll: state.scroll.scroll
});

const mapDispatchToProps = (dispatch) => ({
  getGeoms: () => dispatch(getCountriesGeom()),
  goToSite: (id) => dispatch(goSiteDetail(id)),
  goToDetail: (iso) => dispatch(goCountryDetail(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesMap);

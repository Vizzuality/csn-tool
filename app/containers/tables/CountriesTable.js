import { connect } from 'react-redux';
import CountriesTable from 'components/tables/CountriesTable';
import { getCountryData } from 'actions/countries';

const mapStateToProps = (state) => ({
  data: state.countries.countriesDetail
});

const mapDispatchToProps = (dispatch) => ({
  getCountryData: (iso) => dispatch(getCountryData(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

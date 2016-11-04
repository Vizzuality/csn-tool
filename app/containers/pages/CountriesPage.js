import { connect } from 'react-redux';
import CountriesPage from 'components/pages/CountriesPage';
import { getCountriesList } from 'actions/countries';

const mapStateToProps = (state) => ({
  countries: state.countries.countriesList
});

const mapDispatchToProps = (dispatch) => ({
  getCountriesList: () => dispatch(getCountriesList())
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage);

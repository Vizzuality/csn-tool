import { connect } from 'react-redux';
import CountriesPage from 'components/pages/CountriesPage';

const mapStateToProps = (state) => ({
  countries: state.countries.countriesList
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage);

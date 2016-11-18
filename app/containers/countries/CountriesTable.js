import { connect } from 'react-redux';
import CountriesTable from 'components/countries/CountriesTable';

const mapStateToProps = (state) => ({
  category: state.countries.selectedCountryCategory
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

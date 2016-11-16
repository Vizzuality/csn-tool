import { connect } from 'react-redux';
import CountriesPage from 'components/pages/CountriesPage';

const mapStateToProps = (state, { params }) => ({
  country: params.iso,
  countriesLength: state.countries.countriesGeom ? Object.keys(state.countries.countriesGeom.objects).length : 0
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage);

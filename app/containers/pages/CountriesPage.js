import { connect } from 'react-redux';
import CountriesPage from 'components/pages/CountriesPage';

const mapStateToProps = (state, { params }) => ({
  country: params.iso
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage);

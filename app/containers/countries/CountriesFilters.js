import { connect } from 'react-redux';
import { getFiltersHeight } from 'actions/scroll';
import CountriesFilters from 'components/countries/CountriesFilters';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  getFiltersHeight: (height) => dispatch(getFiltersHeight(height))
});


export default connect(mapStateToProps, mapDispatchToProps)(CountriesFilters);

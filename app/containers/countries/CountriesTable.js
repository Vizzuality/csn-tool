import { connect } from 'react-redux';
import CountriesTable from 'components/countries/CountriesTable';

function getCountryData(countries) {
  return countries[countries.selectedCategory] && countries[countries.selectedCategory][countries.selected]
    ? countries[countries.selectedCategory][countries.selected]
    : false;
}

const mapStateToProps = (state) => ({
  country: state.countries.selected,
  category: state.countries.selectedCategory,
  data: getCountryData(state.countries)
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

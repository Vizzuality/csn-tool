import { connect } from 'react-redux';
import CountriesPage from 'components/pages/CountriesPage';
import { getCountryStats, getCountrySites, getCountrySitesOld, getCountrySpecies,
  getCountryPopulations } from 'actions/countries';

function getCountryData(countries) {
  return countries[countries.selectedCategory] && countries[countries.selectedCategory][countries.selected]
    ? countries[countries.selectedCategory][countries.selected]
    : false;
}

const mapStateToProps = (state) => ({
  country: state.countries.selected,
  category: state.countries.selectedCategory,
  countryStats: state.countries.stats[state.countries.selected] || false,
  countryData: getCountryData(state.countries),
  countriesLength: state.countries.geoms ? Object.keys(state.countries.geoms.objects).length : 0
});

const mapDispatchToProps = (dispatch) => ({
  getCountryStats: (iso) => dispatch(getCountryStats(iso)),
  getCountryData: (country, category) => {
    switch (category) {
      case 'species':
        dispatch(getCountrySpecies(country));
        break;
      case 'populations':
        dispatch(getCountryPopulations(country));
        break;
      case 'sitesOld':
        dispatch(getCountrySitesOld(country));
        break;
      default:
        dispatch(getCountrySites(country));
        break;
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage);

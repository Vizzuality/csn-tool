import { connect } from 'react-redux';
import CountriesPage from 'components/pages/CountriesPage';
import { getCountryStats, getCountrySites, getCountrySitesOld, getCountrySpecies,
  getCountryPopulations, getCountryLookAlikeSpecies, getCountriesList } from 'actions/countries';
import { setScrollState } from 'actions/scroll';

function getCountryData(countries) {
  return countries[countries.selectedCategory] && countries[countries.selectedCategory][countries.selected]
    ? countries[countries.selectedCategory][countries.selected]
    : false;
}

const mapStateToProps = (state) => ({
  country: state.countries.selected,
  category: state.countries.selectedCategory,
  filter: state.countries.filter,
  countries: state.countries.countries,
  countryStats: state.countries.stats[state.countries.selected] || false,
  countryData: getCountryData(state.countries),
  countriesLength: state.countries.geoms ? Object.keys(state.countries.geoms.objects).length : 0,
  scroll: state.scroll.scroll,
  scrollLimit: state.scroll.scrollLimit
});

const mapDispatchToProps = (dispatch) => ({
  setScrollState: (bool) => dispatch(setScrollState(bool)),
  getCountryStats: (iso) => dispatch(getCountryStats(iso)),
  getCountriesList: () => dispatch(getCountriesList()),
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
      case 'lookAlikeSpecies':
        dispatch(getCountryLookAlikeSpecies(country));
        break;
      default:
        dispatch(getCountrySites(country));
        break;
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage);

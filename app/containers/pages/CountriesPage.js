import { connect } from 'react-redux';
import CountriesPage from 'components/pages/CountriesPage';
import {
  getCountryStats,
  getCountrySites,
  getCountryCriticalSites,
  getCountrySpecies,
  getCountryPopulations,
  getCountryLookAlikeSpecies,
  getCountryLookAlikeSpeciesPopulation,
  getCountriesList
} from 'actions/countries';

function getCountryData(countries) {
  const id = countries.selectedLASpeciesPopulation || countries.selected;

  return countries[countries.selectedCategory] && countries[countries.selectedCategory][id]
       ? countries[countries.selectedCategory][id]
       : false;
}

const mapStateToProps = (state) => ({
  country: state.countries.selected,
  category: state.countries.selectedCategory,
  selectedPopulationId: state.countries.selectedLASpeciesPopulation,
  countries: state.countries.countries,
  countryStats: state.countries.stats[state.countries.selected] || false,
  countryData: getCountryData(state.countries),
  countriesLength: state.countries.geoms ? Object.keys(state.countries.geoms.objects).length : 0
});

const mapDispatchToProps = (dispatch) => ({
  getCountryStats: (iso) => dispatch(getCountryStats(iso)),
  getCountriesList: () => dispatch(getCountriesList()),
  getCountryData: (country, category, populationId) => {
    switch (category) {
      case 'species':
        dispatch(getCountrySpecies(country));
        break;
      case 'populations':
        dispatch(getCountryPopulations(country));
        break;
      case 'criticalSites':
        dispatch(getCountryCriticalSites(country));
        break;
      case 'lookAlikeSpecies':
        dispatch(getCountryLookAlikeSpecies(country));
        break;
      case 'lookAlikeSpeciesPopulation':
        dispatch(getCountryLookAlikeSpecies(country));
        dispatch(getCountryLookAlikeSpeciesPopulation(country, populationId));
        break;
      default:
        dispatch(getCountrySites(country));
        break;
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage);

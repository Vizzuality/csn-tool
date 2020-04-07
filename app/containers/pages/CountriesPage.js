import { connect } from 'react-redux';
import get from 'lodash/get';

import CountriesPage from 'components/pages/CountriesPage';
import {
  getCountryStats,
  getCountrySites,
  getCountryCriticalSites,
  getCountrySpecies,
  getCountryPopulations,
  getCountryTriggerSuitability,
  getCountryLookAlikeSpecies,
  getCountryLookAlikeSpeciesCount,
  getCountryLookAlikeSpeciesPopulation,
  getCountriesList
} from 'actions/countries';

function getCountryData(countries) {
  const id = countries.selectedLASpeciesPopulation || countries.selected;
  return get(countries, `${countries.selectedCategory}.${id}`, false);
}

const mapStateToProps = (state) => ({
  country: state.countries.selected,
  category: state.countries.selectedCategory,
  selectedPopulationId: state.countries.selectedLASpeciesPopulation,
  countries: state.countries.countries,
  countryStats: state.countries.stats[state.countries.selected] || false,
  countryData: getCountryData(state.countries),
  countriesLength: get(state.countries, 'geoms.objects.collection.geometries.length', 0)
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
        dispatch(getCountryLookAlikeSpeciesCount(country));
        break;
      case 'lookAlikeSpeciesPopulation':
        dispatch(getCountryLookAlikeSpecies(country));
        dispatch(getCountryLookAlikeSpeciesPopulation(country, populationId));
        break;
      case 'triggerSuitability':
        dispatch(getCountryTriggerSuitability(country));
        break;
      default:
        dispatch(getCountrySites(country));
        break;
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage);

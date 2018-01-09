import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getCountriesGeom, goCountryDetail } from 'actions/countries';
import { goSiteDetail } from 'actions/sites';
import CountriesMap from 'components/countries/CountriesMap';

const getSelectedLASpeciesPopulation = ({ lookAlikeSpecies, selected, selectedLASpeciesPopulation }) => {
  if (!selectedLASpeciesPopulation) return null;

  const populations = lookAlikeSpecies[selected] || [];

  return populations.find(
    (las) => las.pop_id_origin === parseInt(selectedLASpeciesPopulation, 10)
  );
};
const getPopulations = createSelector(
  getSelectedLASpeciesPopulation,
  (countries) => countries.selected,
  (countries) => countries.selectedTableItem,
  (selectedLASpeciesPopulation, selected, selectedTableItem) => {
    const selectedALikeSpecies = selectedTableItem;

    if (!selectedLASpeciesPopulation) return false;

    const selectedSpecies = {
      population: `${selectedLASpeciesPopulation.original_species} (${selectedLASpeciesPopulation.population})`,
      wpepopid: selectedLASpeciesPopulation.pop_id_origin
    };
    const results = [selectedSpecies];
    if (selectedALikeSpecies) {
      results.push({
        population: `${selectedALikeSpecies.scientific_name} (${selectedALikeSpecies.population})`,
        wpepopid: selectedALikeSpecies.wpepopid
      });
    }

    return {
      populations: results,
      fitToPopulationId: results.slice(-1)[0].wpepopid
    };
  }
);

const mapStateToProps = ({ countries } = {}) => {
  const {
    populations,
    fitToPopulationId
  } = getPopulations(countries);

  return {
    country: countries.selected,
    geoms: countries.geoms,
    searchFilter: countries.searchFilter,
    data: countries.sites[countries.selected] || [],
    populations: populations || false,
    fitToPopulationId,
    layers: countries.layers
  };
};

const mapDispatchToProps = (dispatch) => ({
  getGeoms: () => dispatch(getCountriesGeom()),
  goToSite: (id) => dispatch(goSiteDetail(id)),
  goToDetail: (iso) => dispatch(goCountryDetail(iso))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesMap);

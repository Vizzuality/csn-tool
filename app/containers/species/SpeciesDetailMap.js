import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SpeciesDetailMap from 'components/species/SpeciesDetailMap';

const getSelectedLASpeciesPopulation = ({ lookAlikeSpecies, selected, selectedLASpeciesPopulation }) => {
  if (!selectedLASpeciesPopulation) return null;

  const populations = lookAlikeSpecies[selected] || [];

  return populations.find(
    (las) => las.pop_id_origin === parseInt(selectedLASpeciesPopulation, 10)
  );
};
const getPopulations = createSelector(
  getSelectedLASpeciesPopulation,
  (species) => species.population,
  (species) => species.selected,
  (species) => species.selectedTableItem,
  (selectedLASpeciesPopulation, population, selected, selectedTableItem) => {
    const selectedALikeSpecies = selectedTableItem;

    if (!selectedLASpeciesPopulation) {
      return {
        populations: population[selected],
        fitToPopulationId: null
      };
    }

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

const mapStateToProps = (state) => {
  const {
    populations,
    fitToPopulationId
  } = getPopulations(state.species);

  return {
    id: state.species.selected,
    sites: state.species.sites[state.species.selected] || false,
    criticalSites: state.species.criticalSites[state.species.selected] || false,
    populations: populations || false,
    selectedPopulationId: state.species.highlightedPopulationId,
    fitToPopulationBoudaries: !state.species.selectedLASpeciesPopulation,
    fitToPopulationId,
    layers: state.species.layers,
    selectedCategory: state.species.selectedCategory
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailMap);

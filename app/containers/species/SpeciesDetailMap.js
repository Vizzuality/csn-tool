import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SpeciesDetailMap from 'components/species/SpeciesDetailMap';

const getPopulations = createSelector(
  (species) => species.selectedLASpeciesPopulation,
  (species) => species.population,
  (species) => species.selected,
  (selectedLASpeciesPopulation, population, selected) => {
    if (!selectedLASpeciesPopulation) {
      return {
        populations: population[selected],
        fitToPopulationId: null
      };
    }

    const {
      species,
      selectedALikeSpecies
    } = selectedLASpeciesPopulation;

    const selectedSpecies = {
      population: `${species.original_species} (${species.population})`,
      wpepopid: selectedLASpeciesPopulation.species.pop_id_origin
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

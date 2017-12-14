import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SpeciesDetailMap from 'components/species/SpeciesDetailMap';

const getPopulations = createSelector(
  (species) => species.selectedLASpeciesPopulation,
  (species) => species.population,
  (species) => species.selected,
  (selectedLASpeciesPopulation, population, selected) => {
    if (!selectedLASpeciesPopulation) return population[selected];

    const originalSpecies = selectedLASpeciesPopulation.species;

    const selectedSpecies = {
      population: `${originalSpecies.original_species} (${originalSpecies.population})`,
      wpepopid: selectedLASpeciesPopulation.species.pop_id_origin
    };

    return [
      selectedSpecies,
      ...selectedLASpeciesPopulation.aLikeSpecies.map(({ scientific_name, population, wpepopid }) => ({
        population: `${scientific_name} (${population})`,
        wpepopid
      }))
    ];
  }
);

const mapStateToProps = (state) => ({
  id: state.species.selected,
  sites: state.species.sites[state.species.selected] || false,
  criticalSites: state.species.criticalSites[state.species.selected] || false,
  populations: getPopulations(state.species) || false,
  selectedPopulationId: state.species.highlightedPopulationId,
  layers: state.species.layers,
  selectedCategory: state.species.selectedCategory
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailMap);

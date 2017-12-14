import { connect } from 'react-redux';
import SpeciesDetailMap from 'components/species/SpeciesDetailMap';

const mapStateToProps = (state) => ({
  id: state.species.selected,
  sites: state.species.sites[state.species.selected] || false,
  criticalSites: state.species.criticalSites[state.species.selected] || false,
  population: state.species.population[state.species.selected] || false,
  selectedPopulationId: state.species.highlightedPopulationId || state.species.selectedPopulationId,
  fitBoundsToSelectedPopulation: !!(!state.species.highlightedPopulationId && state.species.selectedPopulationId),
  layers: state.species.layers,
  selectedCategory: state.species.selectedCategory
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailMap);

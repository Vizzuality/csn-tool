import { connect } from 'react-redux';
import SpeciesDetailMap from 'components/species/SpeciesDetailMap';

const mapStateToProps = (state) => ({
  id: state.species.selected,
  sites: state.species.sites[state.species.selected] || false,
  population: state.species.population[state.species.selected] || false,
  layers: state.species.layers
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailMap);

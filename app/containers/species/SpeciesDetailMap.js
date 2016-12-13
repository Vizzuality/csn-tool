import { connect } from 'react-redux';
import SpeciesDetailMap from 'components/species/SpeciesDetailMap';
import { getSpeciesLayers } from 'actions/species';

const mapStateToProps = (state) => ({
  id: state.species.selected,
  sites: state.species.sites[state.species.selected] || false,
  population: state.species.population[state.species.selected] || false,
  layers: state.species.layers[state.species.selected] || false
});

const mapDispatchToProps = (dispatch) => ({
  getLayers: (id) => dispatch(getSpeciesLayers(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailMap);

import { connect } from 'react-redux';
import { getSpeciesSites, getSpeciesPopulation } from 'actions/species';
import SpeciesDetailMap from 'components/species/SpeciesDetailMap';

const mapStateToProps = (state) => ({
  id: state.species.selected,
  sites: state.species.sites[state.species.selected] || false,
  population: state.species.population[state.species.selected] || false,
  layers: state.species.layers
});

const mapDispatchToProps = (dispatch) => ({
  getSpeciesPopulation: (id) => dispatch(getSpeciesPopulation(id)),
  getSpeciesSites: (id) => dispatch(getSpeciesSites(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailMap);

import { connect } from 'react-redux';
import SpeciesDetailPage from 'components/pages/SpeciesDetailPage';
import { getSpeciesSites, getSpeciesPopulation, getSpeciesThreats, getSpeciesHabitats } from 'actions/species';

const mapStateToProps = (state, { params }) => ({
  id: params.id,
  category: state.species.selectedCategory,
  sites: state.species.sites[params.id] || false,
  population: state.species.population[params.id] || false,
  threats: state.species.threats[params.id] || false,
  habitats: state.species.habitats[params.id] || false
});

const mapDispatchToProps = (dispatch) => ({
  getSpeciesData: (id, category) => {
    switch (category) {
      case 'population':
        dispatch(getSpeciesPopulation(id));
        break;
      case 'threats':
        dispatch(getSpeciesThreats(id));
        break;
      case 'habitats':
        dispatch(getSpeciesHabitats(id));
        break;
      default:
        dispatch(getSpeciesSites(id));
        break;
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailPage);

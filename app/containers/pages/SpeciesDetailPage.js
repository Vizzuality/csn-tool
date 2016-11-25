import { connect } from 'react-redux';
import SpeciesDetailPage from 'components/pages/SpeciesDetailPage';
import { getSpeciesSites, getSpeciesPopulation, getSpeciesThreats, getSpeciesHabitats } from 'actions/species';

const mapStateToProps = (state, { params }) => ({
  slug: params.slug,
  category: state.species.selectedCategory,
  sites: state.species.sites[params.slug] || false,
  population: state.species.population[params.slug] || false,
  threats: state.species.threats[params.slug] || false,
  habitats: state.species.habitats[params.slug] || false
});

const mapDispatchToProps = (dispatch) => ({
  getSpeciesData: (slug, category) => {
    switch (category) {
      case 'population':
        dispatch(getSpeciesPopulation(slug));
        break;
      case 'threats':
        dispatch(getSpeciesThreats(slug));
        break;
      case 'habitats':
        dispatch(getSpeciesHabitats(slug));
        break;
      default:
        dispatch(getSpeciesSites(slug));
        break;
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailPage);

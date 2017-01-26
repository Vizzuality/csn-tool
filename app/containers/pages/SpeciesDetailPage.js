import { connect } from 'react-redux';
import SpeciesDetailPage from 'components/pages/SpeciesDetailPage';
import { getSpeciesStats, getSpeciesSites, getSpeciesPopulation, getSpeciesThreats, getSpeciesHabitats, getSpeciesLookAlikeSpecies } from 'actions/species';

function getSpeciesData(species) {
  return species[species.selectedCategory] && species[species.selectedCategory][species.selected]
    ? species[species.selectedCategory][species.selected]
    : false;
}

const mapStateToProps = (state) => ({
  id: state.species.selected,
  category: state.species.selectedCategory,
  stats: state.species.stats || false,
  data: getSpeciesData(state.species)
});

const mapDispatchToProps = (dispatch) => ({
  getSpeciesStats: id => dispatch(getSpeciesStats(id)),
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
      case 'lookAlikeSpecies':
        dispatch(getSpeciesLookAlikeSpecies(id));
        break;
      default:
        dispatch(getSpeciesSites(id));
        break;
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailPage);

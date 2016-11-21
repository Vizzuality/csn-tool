import { connect } from 'react-redux';
import SpeciesDetailPage from 'components/pages/SpeciesDetailPage';
import { getSpecies } from 'actions/species';

const mapStateToProps = (state, { params }) => ({
  slug: params.slug,
  data: state.species.speciesData[params.slug] || []
});

const mapDispatchToProps = (dispatch) => ({
  getSpecies: (slug) => dispatch(getSpecies(slug))
});


export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailPage);

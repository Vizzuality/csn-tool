import { connect } from 'react-redux';
import SpeciesPage from 'components/pages/SpeciesPage';
import { getSpeciesList } from 'actions/species';

const mapStateToProps = (state) => ({
  species: state.species.list
});

const mapDispatchToProps = (dispatch) => ({
  getSpeciesList: () => dispatch(getSpeciesList())
});


export default connect(mapStateToProps, mapDispatchToProps)(SpeciesPage);

import { connect } from 'react-redux';
import SitesPage from 'components/pages/SitesPage';
import { getSitesList, getSitesSpecies, getSitesThreats } from 'actions/sites';

const mapStateToProps = (state, { params }) => ({
  selected: state.sites.selected,
  category: state.sites.selectedCategory,
  list: state.sites.list,
  details: state.sites.species[params.selected] || false,
  threats: state.sites.threats[params.selected] || false
});

const mapDispatchToProps = (dispatch) => ({
  getSitesList: () => dispatch(getSitesList()),
  getSitesData: (slug, category) => {
    switch (category) {
      case 'threats':
        dispatch(getSitesThreats(slug));
        break;
      case 'species':
        dispatch(getSitesSpecies(slug));
        break;
      default:
        dispatch(getSitesSpecies(slug));
        break;
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SitesPage);

import { connect } from 'react-redux';
import ContainerPage from 'components/pages/ContainerPage';
import { updateLang } from 'actions/locales';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateLang: lang => dispatch(updateLang(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerPage);

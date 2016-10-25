import { connect } from 'react-redux';
import Header from 'components/common/Header';
import { updateLang } from 'actions/locales';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = (dispatch) => ({
  updateLang: lang => dispatch(updateLang(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

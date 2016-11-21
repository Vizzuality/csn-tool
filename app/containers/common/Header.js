import { connect } from 'react-redux';
import Header from 'components/common/Header';
import { setLangURL } from 'actions/locales';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = (dispatch) => ({
  setLangURL: lang => dispatch(setLangURL(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

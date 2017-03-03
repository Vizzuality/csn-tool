import { connect } from 'react-redux';
import Header from 'components/common/Header';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

export default connect(mapStateToProps)(Header);

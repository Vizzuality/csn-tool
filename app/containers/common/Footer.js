import { connect } from 'react-redux';
import Footer from 'components/common/Footer';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

import { connect } from 'react-redux';
import NavLink from 'components/common/NavLink';

const mapStateToProps = (state) => ({
  lang: state.i18nState && state.i18nState.lang || 'none'
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLink);

import { connect } from 'react-redux';
import NavLink from 'components/common/NavLink';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLink);

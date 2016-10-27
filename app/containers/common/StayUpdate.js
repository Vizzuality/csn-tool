import { connect } from 'react-redux';
import StayUpdate from 'components/common/StayUpdate';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StayUpdate);

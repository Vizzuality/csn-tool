import { connect } from 'react-redux';
import GoBackLink from 'components/common/GoBackLink';
import { goBack } from 'react-router-redux';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(GoBackLink);

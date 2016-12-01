import { connect } from 'react-redux';
import GoBackLink from 'components/common/GoBackLink';
import { goBack } from 'react-router-redux';

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack())
});

export default connect(null, mapDispatchToProps)(GoBackLink);

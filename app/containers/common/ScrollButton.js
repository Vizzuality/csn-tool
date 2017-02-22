import { connect } from 'react-redux';
import ScrollButton from 'components/common/ScrollButton';

const mapStateToProps = (state) => ({
  scrollLimit: state.scroll.scrollLimit
});

export default connect(mapStateToProps)(ScrollButton);

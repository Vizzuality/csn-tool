import { connect } from 'react-redux';
import ScrollButton from 'components/common/ScrollButton';
import { setScrollState } from 'actions/scroll';

const mapStateToProps = (state) => ({
  scroll: state.scroll.scroll
});

const mapDispatchToProps = (dispatch) => ({
  setScrollState: (pos) => dispatch(setScrollState(pos))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollButton);

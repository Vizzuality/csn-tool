import { connect } from 'react-redux';
import TableList from 'components/tables/TableList';

const mapStateToProps = (state) => ({
  scroll: state.scroll.scroll,
  filtersHeight: state.scroll.filtersHeight,
  headerheight: state.scroll.headerheight
});

export default connect(mapStateToProps)(TableList);

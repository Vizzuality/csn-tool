import { connect } from 'react-redux';
import TableList from 'components/tables/TableList';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TableList);

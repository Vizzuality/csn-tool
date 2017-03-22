import { connect } from 'react-redux';
import AdvancedSearch from 'components/pages/AdvancedSearchPage';

const mapStateToProps = (state) => ({
  data: {}
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => console.info('TODO: get data')
});


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);

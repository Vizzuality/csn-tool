import { connect } from 'react-redux';
import SearchFilter from 'components/common/SearchFilter';
import { setSearchFilter, zoomOnCountry } from 'actions/countries';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setSearchFilter: (search) => dispatch(setSearchFilter(search)),
  onKeyPress: (event) => {
    if (event.key === 'Enter') {
      dispatch(zoomOnCountry());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);

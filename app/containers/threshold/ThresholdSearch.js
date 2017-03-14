import { connect } from 'react-redux';
import SearchFilter from 'components/common/SearchFilter';
import { getSitesList } from 'actions/sites';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  // TODO: fix bug wrong page pager after search
  setSearchFilter: (search) => {
    if (search) {
      dispatch(getSitesList(0, search));
    } else {
      dispatch(getSitesList(0, null));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);

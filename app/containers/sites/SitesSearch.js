import { connect } from 'react-redux';
import SearchFilter from 'components/common/SearchFilter';
import { setSearchFilter, getSitesList } from 'actions/sites';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
  // When props.id is because we need filter the detail table
  // TODO: improve this
  if (ownProps.id) {
    return { setSearchFilter: (search) => dispatch(setSearchFilter(search)) };
  }
  return {
    setSearchFilter: (search) => {
      if (search) {
        dispatch(getSitesList(null, search));
      } else {
        dispatch(getSitesList(0, null));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);

import { connect } from 'react-redux';
import TableListHeader from 'components/tables/TableListHeader';
import { setSitesTableSort } from 'actions/sites';

const mapStateToProps = (state) => ({
  sort: state.sites.sort
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sort) => dispatch(setSitesTableSort(sort))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListHeader);

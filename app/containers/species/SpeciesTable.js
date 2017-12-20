import { connect } from 'react-redux';
import SpeciesTable from 'components/species/SpeciesTable';
import { filterData } from 'helpers/filters';

const mapStateToProps = (state) => {
  const columns = state.species.columns;
  const filter = state.search.results ? state.search.search : state.species.searchFilter;
  const data = state.search.results ? state.search.results.rows : state.species.list;

  return {
    isSearch: state.search.results && state.search.results.rows.length > 0 || false,
    data: filterData({ data, columns, filter }),
    columns,
    allColumns: state.species.allColumns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesTable);

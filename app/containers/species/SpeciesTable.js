import { connect } from 'react-redux';
import SpeciesTable from 'components/species/SpeciesTable';
import { filterData } from 'helpers/filters';

const mapStateToProps = (state) => {
  const columns = state.species.columns;
  const filter = state.species.searchFilter;
  const data = state.species.list;

  return {
    data: filterData({ data, columns, filter }),
    columns,
    allColumns: state.species.allColumns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesTable);

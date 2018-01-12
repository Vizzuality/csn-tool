import { connect } from 'react-redux';
import SpeciesTable from 'components/species/SpeciesTable';
import { filterData } from 'helpers/filters';
import { filterColumnsBasedOnLanguage } from 'helpers/language';

const mapStateToProps = (state) => {
  const columns = state.species.columns;
  const filter = state.species.searchFilter;
  const data = state.species.list;

  return {
    data: filterData({ data, columns, filter }),
    columns,
    allColumns: filterColumnsBasedOnLanguage(state.species.allColumns, state.i18nState.lang)
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesTable);

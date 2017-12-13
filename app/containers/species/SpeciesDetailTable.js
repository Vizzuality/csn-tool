import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';
import { filterByColumns, filterBySearch } from 'helpers/filters';
import { mapSelectPopulation } from 'actions/species';

function getSpeciesDetailData(rows, columns, filter, columnFilter) {
  if (!rows || rows.length === 0) return [];

  const data = rows.slice();

  const searchFilter = (typeof filter === 'string') && filter.toLowerCase();

  let filteredData = data;

  if (columnFilter && Object.keys(columnFilter).length !== 0) {
    filteredData = filterByColumns(filteredData, columnFilter);
  }

  if (searchFilter) {
    filteredData = filterBySearch(data, searchFilter, columns);
  }

  return filteredData;
}

const mapStateToProps = (state) => {
  // if it comes from search, show fields instead of species columns
  const columns = state.search.results && state.search.results.fields ?
    Object.keys(state.search.results.fields) : state.species.columns;

  const species = state.species;
  const detailList = species[species.selectedCategory] && species[species.selectedCategory][species.selected]
    ? species[species.selectedCategory][species.selected]
    : false;

  const data = state.search.results ?
    getSpeciesDetailData(state.search.results.rows, columns, state.search.search, state.search.columnFilter) :
    getSpeciesDetailData(detailList, columns, state.species.searchFilter, state.species.columnFilter);

  return {
    species: state.species.selected,
    category: state.search.results ? 'population' : state.species.selectedCategory,
    isSearch: state.search.results && state.search.results.rows.length > 0 || false,
    data,
    columns,
    allColumns: state.species.allColumns,
    expandedColumns: state.species.expandedColumns,
    allExpandedColumns: state.species.allExpandedColumns
  };
};

const mapDispatchToProps = {
  mapSelectPopulation
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailTable);

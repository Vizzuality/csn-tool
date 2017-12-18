import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';
import { filterByColumns, filterBySearch } from 'helpers/filters';
import {
  selectLASpeciesPopulation,
  selectLASpeciesPopulationSpecies
} from 'actions/species';

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

function getDetailList(species) {
  if (species.selectedLASpeciesPopulation) return species.selectedLASpeciesPopulation.aLikeSpecies;

  return species[species.selectedCategory] && species[species.selectedCategory][species.selected]
    ? species[species.selectedCategory][species.selected]
    : [];
}

function getColumns({ species, search }) {
  const isExpandedView = species.selectedCategory === 'lookAlikeSpecies' && species.selectedLASpeciesPopulation;
  // if it comes from search, show fields instead of species columns
  const columns = search.results && search.results.fields
          ? Object.keys(search.results.fields)
          : species.columns;

  return {
    allColumns: isExpandedView ? species.allExpandedColumns : species.allColumns,
    columns: isExpandedView ? species.expandedColumns : columns
  };
}

const mapStateToProps = (state) => {
  const species = state.species;
  const detailList = getDetailList(species);
  const {
    allColumns,
    columns
  } = getColumns(state);

  const data = state.search.results ?
    getSpeciesDetailData(state.search.results.rows, columns, state.search.search, state.search.columnFilter) :
    getSpeciesDetailData(detailList, columns, state.species.searchFilter, state.species.columnFilter);

  return {
    species: state.species.selected,
    category: state.search.results ? 'population' : state.species.selectedCategory,
    isSearch: state.search.results && state.search.results.rows.length > 0 || false,
    data,
    allColumns,
    columns,
    selectedLASpeciesPopulation: state.species.selectedLASpeciesPopulation
  };
};

const mapDispatchToProps = {
  selectLASpeciesPopulation,
  selectLASpeciesPopulationSpecies
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailTable);

import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';
import { filterByColumns, filterBySearch } from 'helpers/filters';
import { selectSpeciesTableItem } from 'actions/species';

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
  const id = species.selectedLASpeciesPopulation || species.selected;

  return species[species.selectedCategory] && species[species.selectedCategory][id]
    ? species[species.selectedCategory][id]
    : [];
}

function getSelectedSpeciesPopulation(species) {
  if (!species.selectedLASpeciesPopulation) return null;

  const lookAlikeSpecies = species.lookAlikeSpecies && species.lookAlikeSpecies[species.selected];

  return (lookAlikeSpecies || []).find((las) => las.pop_id_origin === parseInt(species.selectedLASpeciesPopulation, 10));
}

const mapStateToProps = (state) => {
  const columns = state.search.results && state.search.results.fields ?
          Object.keys(state.search.results.fields) : state.species.columns;
  const species = state.species;
  const detailList = getDetailList(species);

  const data = state.search.results ?
    getSpeciesDetailData(state.search.results.rows, columns, state.search.search, state.search.columnFilter) :
    getSpeciesDetailData(detailList, columns, state.species.searchFilter, state.species.columnFilter);

  return {
    category: state.search.results ? 'population' : state.species.selectedCategory,
    isSearch: state.search.results && state.search.results.rows.length > 0 || false,
    data,
    allColumns: state.species.allColumns,
    columns,
    selectedLASpeciesPopulation: getSelectedSpeciesPopulation(state.species),
    selectedTableItem: species.selectedTableItem
  };
};

const mapDispatchToProps = {
  selectSpeciesTableItem
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailTable);

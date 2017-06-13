import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';
import { filterByColumns, filterBySearch } from 'helpers/filters';

function getSpeciesDetailColumns(category) {
  switch (category) {
    case 'population':
      return ['population', 'iucn_category', 'a', 'b', 'c',
        'caf_action_plan', 'eu_birds_directive', 'flyway_range', 'year_start',
        'year_end', 'size_min', 'size_max', 'ramsar_criterion'];
    case 'lookAlikeSpecies':
      return ['population', 'original_a', 'original_b', 'original_c', 'confusion_species', 'confusion_species_as'];
    default:
      return ['country', 'site_name', 'protected', 'season', 'start', 'end', 'minimum',
        'maximum', 'geometric_mean', 'units', 'iba_criteria'];
  }
}

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
  const columns = state.species.columns; // getSpeciesDetailColumns(state.search.results ? 'population' : state.species.selectedCategory);

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
    allColumns: state.species.allColumns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailTable);

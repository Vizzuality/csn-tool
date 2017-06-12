import { connect } from 'react-redux';
import SpeciesTable from 'components/species/SpeciesTable';
import { filterBySearch } from 'helpers/filters';

function getSpeciesData(rows, filter, columns) {
  if (!rows) return [];
  const data = rows.slice();

  const searchFilter = (typeof filter === 'string') && filter.toLowerCase();

  let filteredData = data;
  if (searchFilter) {
    filteredData = filterBySearch(data, searchFilter, columns);
  }

  return filteredData;
}

const mapStateToProps = (state) => {
  const columns = ['scientific_name', 'english_name', 'population', 'genus', 'family'];
  const data = state.search.results ?
    getSpeciesData(state.search.results.rows, state.search.search, columns) :
    getSpeciesData(state.species.list, state.species.searchFilter, columns);

  return {
    species: state.species.selected,
    category: state.species.selectedCategory,
    isSearch: state.search.results && state.search.results.rows.length > 0 || false,
    data,
    columns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesTable);

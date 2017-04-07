import { connect } from 'react-redux';
import SpeciesTable from 'components/species/SpeciesTable';
import { filterBySearch } from 'helpers/filters';

function getSpeciesData(species, columns) {
  const data = species.list || false;

  if (!data || !species.searchFilter) return data;

  let filteredData = data;
  const searchFilter = species.searchFilter.toLowerCase();
  if (searchFilter) {
    filteredData = filterBySearch(data, searchFilter, columns);
  }

  return filteredData;
}

const mapStateToProps = (state) => {
  const columns = ['scientific_name', 'english_name', 'population', 'genus', 'family'];
  return {
    species: state.species.selected,
    category: state.species.selectedCategory,
    data: getSpeciesData(state.species, columns),
    columns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesTable);

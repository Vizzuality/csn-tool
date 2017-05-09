import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';
import { filterByColumns, filterBySearch } from 'helpers/filters';

function getSpeciesDetailColums(category) {
  switch (category) {
    case 'habitats':
      return ['habitat_level_1', 'habitat_level_2'];
    case 'population':
      return ['population', 'iucn_category', 'a', 'b', 'c',
        'caf_action_plan', 'eu_birds_directive', 'flyway_range', 'year_start',
        'year_end', 'size_min', 'size_max', 'ramsar_criterion'];
    case 'threats':
      return ['threat_level_1', 'threat_level_2'];
    case 'lookAlikeSpecies':
      return ['population', 'original_a', 'original_b', 'original_c', 'confusion_species', 'confusion_species_as'];
    default:
      return ['site_name', 'protected', 'season', 'start', 'end', 'minimum',
        'maximum', 'geometric_mean', 'units', 'iba_criteria'];
  }
}

function getSpeciesDetailData(species, columns) {
  const data = species[species.selectedCategory] && species[species.selectedCategory][species.selected]
    ? species[species.selectedCategory][species.selected]
    : false;

  if (!data) return data;

  let filteredData = data;
  if (Object.keys(species.columnFilter).length !== 0) {
    filteredData = filterByColumns(filteredData, species.columnFilter);
  }

  const searchFilter = species.searchFilter.toLowerCase();
  if (searchFilter) {
    filteredData = filterBySearch(data, searchFilter, columns);
  }

  return filteredData;
}

const mapStateToProps = (state) => {
  const columns = getSpeciesDetailColums(state.species.selectedCategory);
  return {
    species: state.species.selected,
    category: state.species.selectedCategory,
    data: getSpeciesDetailData(state.species, columns),
    columns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailTable);

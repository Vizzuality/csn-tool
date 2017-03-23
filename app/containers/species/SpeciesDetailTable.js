import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';
import { filterData } from 'helpers/filters';

function getSpeciesDetailColums(category) {
  switch (category) {
    case 'habitats':
      return ['habitat_level_1', 'habitat_level_2'];
    case 'population':
      return ['populations', 'a', 'b', 'c', 'flyway_range', 'year_start', 'year_end', 'size_min', 'size_max', 'ramsar_criterion'];
    case 'threats':
      return ['threat_level_1', 'threat_level_2'];
    case 'lookAlikeSpecies':
      return ['original_popname', 'original_a', 'original_b', 'original_c', 'confusion_name', 'populationname', 'a', 'b', 'c'];
    default:
      return ['site_name', 'country', 'protection_status', 'iba'];
  }
}

function getSpeciesDetailData(species, columns) {
  const data = species[species.selectedCategory] && species[species.selectedCategory][species.selected]
    ? species[species.selectedCategory][species.selected]
    : false;

  if (!data) return data;

  let filteredData = data;
  if (Object.keys(species.columnFilter).length !== 0) {
    filteredData = filterData(filteredData, species.columnFilter);
  }

  if (species.searchFilter) {
    filteredData = data.filter((item) => {
      let match = false;
      const modItem = item;
      const searchFilter = species.searchFilter.toLowerCase();

      for (let i = 0, cLength = columns.length; i < cLength; i++) {
        if (typeof modItem[columns[i]] === 'string' && modItem[columns[i]].toLowerCase().indexOf(searchFilter) >= 0) {
          modItem[columns[i]] = modItem[columns[i]].toLowerCase().replace(searchFilter, `<span class="filtered">${searchFilter}</span>`);
          match = true;
          break;
        }
      }
      return match;
    });
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

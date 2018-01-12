import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';
import { filterColumnsBasedOnLanguage } from 'helpers/language';
import { filterData } from 'helpers/filters';
import { selectSpeciesTableItem } from 'actions/species';

function getDetailList(species) {
  const id = species.selectedLASpeciesPopulation || species.selected;

  return species[species.selectedCategory] && species[species.selectedCategory][id]
    ? species[species.selectedCategory][id]
    : false;
}

function getSelectedSpeciesPopulation(species) {
  if (!species.selectedLASpeciesPopulation) return null;

  const lookAlikeSpecies = species.lookAlikeSpecies && species.lookAlikeSpecies[species.selected];

  return (lookAlikeSpecies || []).find((las) => las.pop_id_origin === parseInt(species.selectedLASpeciesPopulation, 10));
}

const mapStateToProps = (state) => {
  const columns = state.species.columns;
  const species = state.species;
  const data = getDetailList(species);
  const filter = state.species.searchFilter;
  const columnFilter = state.species.columnFilter;

  return {
    category: state.species.selectedCategory,
    data: filterData({ data, columns, filter, columnFilter }),
    allColumns: filterColumnsBasedOnLanguage(state.species.allColumns, state.i18nState.lang),
    columns,
    selectedLASpeciesPopulation: getSelectedSpeciesPopulation(state.species),
    selectedTableItem: species.selectedTableItem
  };
};

const mapDispatchToProps = {
  selectSpeciesTableItem
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailTable);

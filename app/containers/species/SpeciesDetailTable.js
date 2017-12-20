import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';
import { filterData } from 'helpers/filters';
import { selectSpeciesTableItem } from 'actions/species';

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
  const isSearch = !!(state.search.results);
  const data = isSearch ? state.search.results.rows : detailList;
  const filter = isSearch ? state.search.search : state.species.searchFilter;
  const columnFilter = isSearch ? state.search.columnFilter : state.species.columnFilter;

  return {
    category: state.search.results ? 'population' : state.species.selectedCategory,
    isSearch,
    data: filterData({ data, columns, filter, columnFilter }),
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

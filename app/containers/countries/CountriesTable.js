import { connect } from 'react-redux';
import CountriesTable from 'components/countries/CountriesTable';
import { setSearchFilter } from 'actions/countries';
import { filterByColumns, filterBySearch } from 'helpers/filters';

function getCountryData(countries, columns) {
  const id = countries.selectedLASpeciesPopulation || countries.selected;
  const data = countries[countries.selectedCategory] && countries[countries.selectedCategory][id]
    ? countries[countries.selectedCategory][id]
    : false;

  if (!data) return data;

  const searchFilter = countries.searchFilter.toLowerCase();
  let filteredData = data;
  if (Object.keys(countries.columnFilter).length !== 0) {
    filteredData = filterByColumns(filteredData, countries.columnFilter);
  }
  if (searchFilter) {
    filteredData = filterBySearch(data, searchFilter, columns);
  }
  return filteredData;
}

function getSelectedSpeciesPopulation(countries) {
  if (!countries.selectedLASpeciesPopulation) return null;

  const lookAlikeSpecies = countries.lookAlikeSpecies && countries.lookAlikeSpecies[countries.selected];

  return (lookAlikeSpecies || []).find((las) => las.pop_id_origin === parseInt(countries.selectedLASpeciesPopulation, 10));
}

const mapStateToProps = (state) => {
  const columns = state.countries.columns;

  return {
    country: state.countries.selected,
    category: state.countries.selectedCategory,
    data: getCountryData(state.countries, columns),
    columns,
    allColumns: state.countries.allColumns,
    selectedLASpeciesPopulation: getSelectedSpeciesPopulation(state.countries)
  };
};

const mapDispatchToProps = (dispatch) => ({
  cleanSearchFilter: (search) => dispatch(setSearchFilter(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

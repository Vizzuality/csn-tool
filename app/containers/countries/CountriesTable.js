import { connect } from 'react-redux';
import CountriesTable from 'components/countries/CountriesTable';
import { setSearchFilter } from 'actions/countries';
import { filterByColumns, filterBySearch } from 'helpers/filters';

function getCountryData(countries, columns) {
  const data = countries[countries.selectedCategory] && countries[countries.selectedCategory][countries.selected]
    ? countries[countries.selectedCategory][countries.selected]
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

const mapStateToProps = (state) => {
  const columns = state.countries.columns;

  return {
    country: state.countries.selected,
    category: state.countries.selectedCategory,
    data: getCountryData(state.countries, columns),
    columns,
    allColumns: state.countries.allColumns
  };
};

const mapDispatchToProps = (dispatch) => ({
  cleanSearchFilter: (search) => dispatch(setSearchFilter(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

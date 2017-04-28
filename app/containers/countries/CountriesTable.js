import { connect } from 'react-redux';
import CountriesTable from 'components/countries/CountriesTable';
import { setSearchFilter } from 'actions/countries';
import { filterByColumns, filterBySearch } from 'helpers/filters';

function getCountryColums(category) {
  switch (category) {
    case 'species':
      return ['scientific_name', 'english_name', 'iucn_category',
        'country_status', 'occurrence_status'];
    case 'populations':
      return ['scientific_name', 'english_name', 'iucn_category', 'population',
        'a', 'b', 'c', 'caf_action_plan', 'eu_birds_directive', 'flyway_range',
        'year_start', 'year_end', 'size_min', 'size_max', 'ramsar_criterion'];
    case 'sitesOld':
      return ['site_name', 'protected', 'iba_species', 'total_percentage'];
    case 'lookAlikeSpecies':
      return ['original_species', 'english_name', 'population', 'original_a', 'original_b',
        'original_c', 'confusion_species', 'confusion_species_as'];
    default:
      return ['site_name', 'protected', 'iba_species', 'iba_in_danger'];
  }
}

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
  const columns = getCountryColums(state.countries.selectedCategory);
  return {
    country: state.countries.selected,
    category: state.countries.selectedCategory,
    data: getCountryData(state.countries, columns),
    columns
  };
};

const mapDispatchToProps = (dispatch) => ({
  cleanSearchFilter: (search) => dispatch(setSearchFilter(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

import { connect } from 'react-redux';
import CountriesTable from 'components/countries/CountriesTable';

function getCountryColums(category) {
  switch (category) {
    case 'species':
      return ['scientific_name', 'english_name', 'family', 'genus', 'populations'];
    case 'populations':
      return ['populations', 'scientific_name', 'english_name', 'family', 'genus'];
    default:
      return ['site_name', 'iso3', 'protection_status', 'iba', 'csn'];
  }
}

function getCountryData(countries, columns) {
  const data = countries[countries.selectedCategory] && countries[countries.selectedCategory][countries.selected]
    ? countries[countries.selectedCategory][countries.selected]
    : false;

  if (!data || !countries.searchFilter) return data;

  return data.filter((item) => {
    let match = false;
    for (let i = 0, cLength = columns.length; i < cLength; i++) {
      if (typeof item[columns[i]] === 'string'
          && item[columns[i]].toUpperCase().indexOf(`${countries.searchFilter.toUpperCase()}`) >= 0) {
        match = true;
        break;
      }
    }
    return match;
  });
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

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

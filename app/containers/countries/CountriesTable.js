import { connect } from 'react-redux';
import CountriesTable from 'components/countries/CountriesTable';
import { filterColumnsBasedOnLanguage } from 'helpers/language';
import { filterData } from 'helpers/filters';
import {
  selectCountriesTableItem,
  setSearchFilter
} from 'actions/countries';

function getSelectedSpeciesPopulation(countries) {
  if (!countries.selectedLASpeciesPopulation) return null;

  const lookAlikeSpecies = countries.lookAlikeSpecies && countries.lookAlikeSpecies[countries.selected];

  return (lookAlikeSpecies || []).find((las) => las.pop_id_origin === parseInt(countries.selectedLASpeciesPopulation, 10));
}

const mapStateToProps = (state) => {
  const countries = state.countries;
  const columns = countries.columns;
  const id = countries.selectedLASpeciesPopulation || countries.selected;
  const data = countries[countries.selectedCategory] && countries[countries.selectedCategory][id]
          ? countries[countries.selectedCategory][id]
          : false;

  return {
    country: countries.selected,
    category: countries.selectedCategory,
    data: filterData({ data, columns, filter: countries.searchFilter, columnFilter: countries.columnFilter }),
    columns,
    allColumns: filterColumnsBasedOnLanguage(countries.allColumns, state.i18nState.lang),
    selectedTableItem: countries.selectedTableItem,
    selectedLASpeciesPopulation: getSelectedSpeciesPopulation(countries)
  };
};

const mapDispatchToProps = {
  cleanSearchFilter: setSearchFilter,
  selectCountriesTableItem
};

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTable);

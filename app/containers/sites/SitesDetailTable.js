import { connect } from 'react-redux';
import SitesDetailTable from 'components/sites/SitesDetailTable';

function getSitesColums(category) {
  switch (category) {
    case 'populations':
      return ['scientific_name', 'english_name', 'populations', 'a', 'b', 'c',
        'table_1_status'];
    default:
      return ['scientific_name', 'english_name', 'iucn_category', 'season', 'start',
        'end', 'minimum', 'maximum', 'units', 'csn_criteria', 'iba_criteria'];
  }
}

function getSitesData(sites, columns) {
  const data = sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
    ? sites[sites.selectedCategory][sites.selected].data
    : false;

  if (!data) return data;

  let filteredData = data;
  if (sites.columnFilter.field && columns.indexOf(sites.columnFilter.field)) {
    filteredData = data.filter((item) => (
      item[sites.columnFilter.field] && item[sites.columnFilter.field].toString().toUpperCase() === sites.columnFilter.value.toUpperCase()
    ));
  }

  if (sites.searchFilter) {
    filteredData = data.filter((item) => {
      let match = false;
      const modItem = item;
      const searchFilter = sites.searchFilter.toLowerCase();

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
  const columns = getSitesColums(state.sites.selectedCategory);

  return {
    site: state.sites.selected,
    category: state.sites.selectedCategory,
    data: getSitesData(state.sites, columns),
    columns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SitesDetailTable);

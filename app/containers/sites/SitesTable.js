import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';

function getSitesColums(category) {
  switch (category) {
    case 'populations':
      return ['scientific_name', 'english_name', 'population', 'season',
     'start', 'end', 'minimum', 'maximum', 'units', 'csn_criteria',
     'iba_criteria'];
    case 'threats':
      return ['threat_name'];
    case 'species':
      return ['scientific_name', 'english_name', 'iucn_category'];
    default:
      return ['country', 'site_name', 'protection_status', 'csn', 'iba'];
  }
}

function getSitesData(sites, columns) {
  let data = [];

  if (!sites.selected) {
    data = sites.list;
  } else {
    data = sites[sites.selectedCategory] && sites[sites.selectedCategory][sites.selected]
      ? sites[sites.selectedCategory][sites.selected].data
      : false;
  }

  if (!data || !sites.searchFilter) return data;

  const newData = data.map((a) => Object.assign({}, a));

  const filteredData = newData.filter((item) => {
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

  return filteredData;
}

const mapStateToProps = (state) => {
  const selected = !state.sites.selected ? '' : state.sites.selectedCategory;
  const columns = getSitesColums(selected);

  return {
    selected: state.sites.selected,
    category: state.sites.selectedCategory,
    data: getSitesData(state.sites, columns),
    columns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SitesTable);

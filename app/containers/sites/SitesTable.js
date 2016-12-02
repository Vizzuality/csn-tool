import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';

function getSitesData(sites, columns) {
  const data = sites.list || false;

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
  const columns = ['country', 'site_name', 'protection_status', 'csn', 'iba'];

  return {
    selected: state.sites.selected,
    category: state.sites.selectedCategory,
    data: getSitesData(state.sites, columns),
    columns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SitesTable);

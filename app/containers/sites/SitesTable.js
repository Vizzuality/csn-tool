import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';
import { getSitesList } from 'actions/sites';

function getSitesData(sites, columns) {
  const list = sites.list || false;

  if (!list.data || !sites.searchFilter) return list;

  const newData = list.data.map((a) => Object.assign({}, a));

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
  const columns = ['country', 'site_name', 'protection_status', 'csn', 'iba',
    'qualifying_species'];

  return {
    selected: state.sites.selected,
    category: state.sites.selectedCategory,
    list: getSitesData(state.sites, columns),
    columns
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search) => dispatch(getSitesList(page, search))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesTable);

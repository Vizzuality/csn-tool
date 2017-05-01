import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';
import { getSitesList } from 'actions/sites';

function getSitesColumns(filter) {
  switch (filter) {
    case 'csn':
      return ['country', 'csn_name', 'protected', 'csn', 'total_percentage'];
    default:
      return ['country', 'site_name', 'protected', 'iba_species',
        'iba_in_danger'];
  }
}

function getSitesData(sites, columns) {
  const list = sites.list || false;

  if (!list.data || !sites.searchFilter) return list;

  const filteredData = sites.filter((item) => {
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
  const columns = getSitesColumns(state.sites.filter);

  return {
    selected: state.sites.selected,
    category: state.sites.selectedCategory,
    list: getSitesData(state.sites, columns),
    columns
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSitesList: (page, search, filter) => dispatch(getSitesList(page, search, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesTable);

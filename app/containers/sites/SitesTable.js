import { connect } from 'react-redux';
import SitesTable from 'components/sites/SitesTable';

function getData(sites) {
  if (!sites.selected) return sites.list;
  return sites.details[sites.selected] || false;
}

const mapStateToProps = (state) => ({
  selected: state.sites.selected,
  data: getData(state.sites)
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SitesTable);

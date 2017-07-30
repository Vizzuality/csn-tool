import { connect } from 'react-redux';
import { toggleLayer } from 'actions/countries';
import Legend from 'components/maps/Legend';

const PROTECTION_LEVELS = ['Little/none', 'Some', 'Most', 'Whole'];

function getLegendData(countries) {
  const legend = [];
  if (countries.sites[countries.selected]) {
    const sites = countries.sites[countries.selected];
    const unique = {};
    const distinct = [];
    sites.forEach((site) => {
      if (!unique[site.protected_slug]) {
        distinct.push({
          icon: 'circle',
          name: site.protected,
          status: site.protected_slug
        });
        unique[site.protected_slug] = true;
      }
    });
    distinct.sort((a, b) => {
      const aIndex = PROTECTION_LEVELS.indexOf(a.name);
      const bIndex = PROTECTION_LEVELS.indexOf(b.name);
      return aIndex - bIndex;
    });
    legend.push({
      name: 'Protection level',
      active: countries.layers.sites,
      layer: 'sites',
      data: distinct
    });
  }
  return legend;
}

const mapStateToProps = (state) => ({
  data: getLegendData(state.countries)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (layer) => dispatch(toggleLayer(layer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

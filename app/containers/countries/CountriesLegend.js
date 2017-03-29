import { connect } from 'react-redux';
import { toggleLayer } from 'actions/countries';
import Legend from 'components/maps/Legend';

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
    legend.push({
      name: 'Critical sites',
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

import { connect } from 'react-redux';
import { toggleLayer } from 'actions/species';
import Legend from 'components/maps/Legend';

function getLegendData(species) {
  const legend = [];
  if (species.sites[species.selected]) {
    const sites = species.sites[species.selected];
    const unique = {};
    const distinct = [];
    sites.forEach((site) => {
      if (!unique[site.protection_status_slug]) {
        distinct.push({
          icon: 'circle',
          name: site.protection_status,
          status: site.protection_status_slug
        });
        unique[site.protection_status_slug] = true;
      }
    });

    legend.push({
      name: 'Critical sites',
      active: species.layers.sites,
      layer: 'sites',
      data: distinct
    });
  }
  // if (species.population[species.selected]) {
  //   legend.push(species.population[species.selected]);
  // }
  return legend;
}

const mapStateToProps = (state) => ({
  data: getLegendData(state.species)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (layer) => dispatch(toggleLayer(layer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

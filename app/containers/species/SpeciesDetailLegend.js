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

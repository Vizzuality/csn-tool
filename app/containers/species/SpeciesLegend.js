import { connect } from 'react-redux';
import { toggleLayer } from 'actions/species';
import Legend from 'components/maps/Legend';

function getLegendData(species) {
  const legend = [];
  if (species.sites[species.selected]) {
    const sites = species.sites[species.selected];
    const unique = [...new Set(sites.map(item => item.protection_status))];
    legend.push({
      name: 'Critical sites',
      active: species.layers.sites,
      layer: 'sites',
      data: unique.map((item) => ({
        name: item
      }))
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

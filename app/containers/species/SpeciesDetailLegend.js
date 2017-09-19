import { connect } from 'react-redux';
import { toggleLayer, toggleLegendItem } from 'actions/species';
import Legend from 'components/maps/Legend';

function getLegendData(species, ownProps) {
  const legend = [];
  if (species.sites[species.selected]) {
    const sites = species.sites[species.selected];
    const populations = species.population[species.selected];

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

    const distinctPop = [];
    if (populations) {
      populations.forEach((pop) => {
        distinctPop.push({
          icon: 'dots',
          id: pop.wpepopid,
          name: pop.population,
          color: ownProps.boundaryColorsToPop[pop.wpepopid]
        });
      });
    }

    legend.push({
      name: 'Critical Sites',
      active: species.layers.sites,
      layer: 'sites',
      data: distinct
    });
    legend.push({
      name: 'Population Boundaries',
      active: species.layers.population,
      layer: 'population',
      data: distinctPop.sort((a, b) => a.name.toString() > b.name.toString())
    });
  }
  return legend;
}

const mapStateToProps = (state, ownProps) => ({
  data: getLegendData(state.species, ownProps)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (layer) => dispatch(toggleLayer(layer)),
  onLegendItemHover: (item, active) => dispatch(toggleLegendItem(item, active))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

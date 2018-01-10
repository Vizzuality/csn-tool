import { connect } from 'react-redux';

import { toggleLayer, toggleLegendItem } from 'actions/species';
import Legend from 'components/maps/Legend';
import { uniqueBy } from 'helpers/data';

function getLegendData(species, ownProps) {
  const legend = [];
  const showSiteProtectionLevels = ['sites', 'criticalSites'].includes(species.selectedCategory);

  if (showSiteProtectionLevels) {
    const sites = species[species.selectedCategory][species.selected] || [];
    const uniqueSites = uniqueBy(sites, 'protected_slug').map((site) => ({
      icon: 'circle',
      name: site.protected,
      status: site.protected_slug
    }));

    legend.push({
      name: 'Protection Level',
      active: species.layers.sites,
      layer: 'sites',
      data: uniqueSites
    });
  }

  const populations = (ownProps.populations || []).map((pop) => ({
    icon: 'dots',
    id: pop.wpepopid,
    name: pop.population,
    color: ownProps.populationColors[pop.wpepopid]
  }));
  legend.push({
    name: 'Population Boundaries',
    active: species.layers.population,
    layer: 'population',
    data: populations.sort((a, b) => a.name.toString() > b.name.toString())
  });
  return legend;
}

const mapStateToProps = ({ species }, ownProps) => ({
  data: getLegendData(species, ownProps)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (layer) => dispatch(toggleLayer(layer)),
  onLegendItemHover: (item, active) => dispatch(toggleLegendItem(item, active))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

import { connect } from 'react-redux';

import { getLegendData } from 'helpers/legend';
import { toggleLayer, toggleLegendItem, toggleClimateLayer } from 'actions/species';
import { commonToggleLayer } from 'actions/common';
import Legend from 'components/maps/Legend';

const mapStateToProps = ({ species }, ownProps) => ({
  sections: getLegendData(species, ownProps)
});

const mapDispatchToProps = dispatch => ({
  onSwitchChange: (item) => dispatch(commonToggleLayer(item, toggleLayer)),
  onLegendItemHover: (item, active) => dispatch(toggleLegendItem(item, active)),
  onClimateLayerToggle: (item) => dispatch(toggleClimateLayer(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

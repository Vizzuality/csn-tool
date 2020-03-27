import { connect } from 'react-redux';

import { getLegendData } from 'helpers/legend';
import { toggleLayer, toggleLegendItem } from 'actions/species';
import { commonToggleLayer, commonToggleClimateLayers } from 'actions/common';
import Legend from 'components/maps/Legend';

const mapStateToProps = ({ species }, ownProps) => ({
  sections: getLegendData(species, ownProps)
});

const mapDispatchToProps = dispatch => ({
  onSwitchChange: (item) => dispatch(commonToggleLayer(item, toggleLayer)),
  onSwitchClimateChange: (items, item) => dispatch(commonToggleClimateLayers(items, item, toggleLayer)),
  onLegendItemHover: (item, active) => dispatch(toggleLegendItem(item, active))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

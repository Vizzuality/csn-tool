import { connect } from 'react-redux';

import { getLegendData } from 'helpers/legend';
import { toggleLayer, toggleLegendItem } from 'actions/species';
import Legend from 'components/maps/Legend';

const mapStateToProps = ({ species }, ownProps) => ({
  sections: getLegendData(species, ownProps)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (item) => dispatch(toggleLayer(item.layer)),
  onLegendItemHover: (item, active) => dispatch(toggleLegendItem(item, active))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

import { connect } from 'react-redux';

import { getLegendData } from 'helpers/legend';
import { toggleLayer, toggleLegendItem } from 'actions/countries';
import Legend from 'components/maps/Legend';

const mapStateToProps = (state, ownProps) => ({
  data: getLegendData(state.countries, ownProps)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (layer) => dispatch(toggleLayer(layer)),
  onLegendItemHover: (item, active) => dispatch(toggleLegendItem(item, active))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

import { connect } from 'react-redux';

import { getLegendData } from 'helpers/legend';
import { toggleLayer, toggleLegendItem } from 'actions/countries';
import { commonToggleLayer } from 'actions/common';
import Legend from 'components/maps/Legend';

const mapStateToProps = (state, ownProps) => ({
  sections: getLegendData(state.countries, ownProps)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (item) => dispatch(commonToggleLayer(item, toggleLayer)),
  onLegendItemHover: (item, active) => dispatch(toggleLegendItem(item, active))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

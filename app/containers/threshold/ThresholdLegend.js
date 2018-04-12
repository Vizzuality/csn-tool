import { connect } from 'react-redux';

import { getHydrologySections } from 'helpers/legend';
import { toggleLayer } from 'actions/threshold';
import { commonToggleLayer } from 'actions/common';
import Legend from 'components/maps/Legend';

const mapStateToProps = (state) => ({
  sections: getHydrologySections(state.threshold.layers)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (item) => dispatch(commonToggleLayer(item, toggleLayer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

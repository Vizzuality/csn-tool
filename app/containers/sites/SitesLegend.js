import { connect } from 'react-redux';

import { getSitesSections } from 'helpers/legend';
import { toggleLayer } from 'actions/sites';
import { commonToggleLayer } from 'actions/common';
import Legend from 'components/maps/Legend';

const mapStateToProps = (state) => ({
  sections: getSitesSections(state.sites, state.sites)
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (item) => dispatch(commonToggleLayer(item, toggleLayer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

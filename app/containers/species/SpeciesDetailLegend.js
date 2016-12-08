import { connect } from 'react-redux';
import { toggleLayer } from 'actions/species';
import Legend from 'components/maps/Legend';

const mapStateToProps = (state) => ({
  data: state.species.layers[state.species.selected] || []
});

const mapDispatchToProps = (dispatch) => ({
  onSwitchChange: (layer) => dispatch(toggleLayer(layer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Legend);

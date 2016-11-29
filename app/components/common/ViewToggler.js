import React from 'react';

function ViewToggler(props, context) {
  return (
    <ul className="c-view-toggler">
      <li className={this.state.modeView === 'map' ? 'is-active toggler' : 'togler'} onclick={this.props.setViewMode('map')} >Map</li>
      <li className={this.state.modeView === 'list' ? 'is-active toggler' : 'togler'} onclick={this.props.setViewMode('list')} >Table</li>
    </ul>
  );
}

ViewToggler.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

ViewToggler.propTypes = {
  setViewMode: React.PropTypes.func.isRequired
};

export default ViewToggler;

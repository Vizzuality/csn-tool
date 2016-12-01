import React from 'react';

function ViewToggler(props) {
  return (
    <ul className="c-view-toggler">
      <li className={props.viewMode === 'map' ? 'is-active toggler' : 'toggler'} onClick={() => props.setViewMode('map')} >Map</li>
      <li className={props.viewMode === 'list' ? 'is-active toggler' : 'toggler'} onClick={() => props.setViewMode('list')} >Table</li>
    </ul>
  );
}

ViewToggler.propTypes = {
  viewMode: React.PropTypes.string,
  setViewMode: React.PropTypes.func
};

export default ViewToggler;

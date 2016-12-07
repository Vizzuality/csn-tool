import React from 'react';

function ViewToggler(props, context) {
  return (
    <ul className="c-view-toggler">
      <li
        className={props.viewMode === 'map' ? 'is-active toggler' : 'toggler'}
        onClick={() => props.setViewMode('map')}
      >
        {context.t('map')}
      </li>
      <li
        className={props.viewMode === 'list' ? 'is-active toggler' : 'toggler'}
        onClick={() => props.setViewMode('list')}
      >
        {context.t('table')}
      </li>
    </ul>
  );
}

ViewToggler.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

ViewToggler.propTypes = {
  viewMode: React.PropTypes.string,
  setViewMode: React.PropTypes.func
};

export default ViewToggler;

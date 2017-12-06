import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { replaceUrlParams } from 'helpers/router';


function ViewToggler(props, context) {
  function onToggleMode(mode) {
    const params = { viewMode: mode };
    const route = props.router.getCurrentLocation();
    const url = replaceUrlParams(route.pathname + route.search, params);

    props.router.push(url);
  }

  return (
    <ul className="c-view-toggler">
      <li
        className={props.viewMode === 'map' ? 'is-active toggler' : 'toggler'}
        onClick={() => onToggleMode('map')}
      >
        {context.t('map')}
      </li>
      <li
        className={props.viewMode === 'list' ? 'is-active toggler' : 'toggler'}
        onClick={() => onToggleMode('list')}
      >
        {context.t('table')}
      </li>
    </ul>
  );
}

ViewToggler.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};

ViewToggler.propTypes = {
  viewMode: PropTypes.string,
  router: PropTypes.object.isRequired
};

export default withRouter(ViewToggler);

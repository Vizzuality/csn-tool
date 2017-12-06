import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';

function NavLink(props, context) {
  let search = props.router && props.router.location && props.router.location.search;
  if (props.parent) {
    search = '';
  }
  return (
    <Link activeClassName="-current" className={props.className} to={`/${props.lang}${props.to}${search}`}>
      {props.i18nText ? context.t(props.i18nText) : props.text}
      {props.icon && <svg><use xlinkHref={`#${props.icon}`}></use></svg>}
      {props.children}
    </Link>
  );
}

NavLink.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};

NavLink.propTypes = {
  // Define custom classnames
  className: PropTypes.string,
  // Define the language selected
  lang: PropTypes.string.isRequired,
  // Define the link to go
  to: PropTypes.string.isRequired,
  // Define the text to show
  text: PropTypes.string,
  // Define the text to show translated
  i18nText: PropTypes.string,
  // Define the icon used for the link
  icon: PropTypes.string,
  // Define the child componets
  children: PropTypes.any,
  // Define whether link is a top level
  parent: PropTypes.bool,
  // Define the child componets
  router: PropTypes.object
};

export default withRouter(NavLink);

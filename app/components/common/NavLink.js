import React from 'react';
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
  t: React.PropTypes.func.isRequired
};

NavLink.propTypes = {
  // Define custom classnames
  className: React.PropTypes.string,
  // Define the language selected
  lang: React.PropTypes.string.isRequired,
  // Define the link to go
  to: React.PropTypes.string.isRequired,
  // Define the text to show
  text: React.PropTypes.string,
  // Define the text to show translated
  i18nText: React.PropTypes.string,
  // Define the icon used for the link
  icon: React.PropTypes.string,
  // Define the child componets
  children: React.PropTypes.any,
  // Define whether link is a top level
  parent: React.PropTypes.bool,
  // Define the child componets
  router: React.PropTypes.object
};

export default withRouter(NavLink);

import React from 'react';
import PropTypes from 'prop-types';

function GoBackLink(props, context) {
  let url;
  if (window.previousLocation) {
    const prevPath = window.previousLocation.pathname.substring(4);
    const prevSearch = window.previousLocation.search;
    url = prevPath + prevSearch;
  } else {
    url = props.endPoint;
  }
  return (
    <a href={`/${props.lang}/${url}`} className={props.className} >
      {props.i18nText ? context.t(props.i18nText) : props.text}
      {props.icon && <svg><use xlinkHref={`#${props.icon}`}></use></svg>}
    </a>
  );
}

GoBackLink.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};

GoBackLink.propTypes = {
  // Go back function
  goBack: PropTypes.func.isRequired,
  // Define custom classnames
  className: PropTypes.string,
  // Define the text to show
  text: PropTypes.string,
  // Define the text to show translated
  i18nText: PropTypes.string,
  // Define the icon used for the link
  icon: PropTypes.string,
  // Define link end point
  endPoint: PropTypes.string,
  // Define link language state
  lang: PropTypes.string
};

export default GoBackLink;

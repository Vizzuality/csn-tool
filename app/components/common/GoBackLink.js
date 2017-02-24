import React from 'react';

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
  t: React.PropTypes.func.isRequired
};

GoBackLink.propTypes = {
  // Go back function
  goBack: React.PropTypes.func.isRequired,
  // Define custom classnames
  className: React.PropTypes.string,
  // Define the text to show
  text: React.PropTypes.string,
  // Define the text to show translated
  i18nText: React.PropTypes.string,
  // Define the icon used for the link
  icon: React.PropTypes.string,
  // Define link end point
  endPoint: React.PropTypes.string,
  // Define link language state
  lang: React.PropTypes.string
};

export default GoBackLink;

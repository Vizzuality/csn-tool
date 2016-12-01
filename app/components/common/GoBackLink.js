import React from 'react';

function GoBackLink(props, context) {
  return (
    <a href="#" className={props.className} onClick={props.goBack} >
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
  icon: React.PropTypes.string
};

export default GoBackLink;

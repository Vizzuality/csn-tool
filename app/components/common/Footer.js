import React from 'react';
import { Link } from 'react-router';

function Footer(props, context) {
  return (
    <footer className="l-footer">
      <div className="row c-footer">
        <div className="column align-self-middle">

        </div>
        <div className="column align-self-middle">
          <ul>
            <li>
              <Link to={`/${props.lang}`}>{context.t('home')}</Link>
            </li>
            <li>
              <Link to={`/${props.lang}/countries`}>{context.t('countries')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

Footer.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

Footer.propTypes = {
  // Define the language selected
  lang: React.PropTypes.string.isRequired
};

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import SecondaryNav from 'components/common/SecondaryNav';

function Footer(props) {
  return (
    <footer className="l-footer">
      <div className="row align-middle c-footer">
        <div className="column small-12 medium-6">
          <a className="birdlife-logo" href="http://www.birdlife.org/" target="_blank" rel="noopener noreferrer">
            <img src="/img/birdlife@2x.png" alt="Bird life logo" />
          </a>
          <a className="wetlands-logo" href="https://www.wetlands.org/" target="_blank" rel="noopener noreferrer">
            <img src="/img/wetlands@2x.png" alt="Wet land logo" />
          </a>
        </div>
        <div className="column small-12 medium-6 secondary-menu">
          <SecondaryNav />
          <Link className="logo" to={`/${props.lang}`}>
            <svg className="icon-logo-small">
              <use xlinkHref="#logo-small"></use>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  // Define the language selected
  lang: PropTypes.string.isRequired
};

export default Footer;

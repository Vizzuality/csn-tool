import React from 'react';
import { Link } from 'react-router';
import StayUpdate from 'containers/common/StayUpdate';
import SecondaryNav from 'components/common/SecondaryNav';

function Footer(props) {
  return (
    <footer className="l-footer">
      <div className="row align-middle c-footer">
        <div className="column small-12 medium-6">
          <StayUpdate />
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
  lang: React.PropTypes.string.isRequired
};

export default Footer;

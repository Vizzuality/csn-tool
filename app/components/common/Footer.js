import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <footer className="l-footer">
    <div className="row c-footer">
      <div className="column align-self-middle">
        <Link activeClassName="-current" to="/">Home</Link>
      </div>
      <div className="column align-self-middle">
        <ul>
          <li>
            <Link activeClassName="-current" to="/countries">Countries</Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

Header.propTypes = {};

export default Header;

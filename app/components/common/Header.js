import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <header className="l-header">
    <nav className="row align-middle c-header">
      <div className="column small-9 medium-4">
        <Link activeClassName="-current" to="/">Home</Link>
      </div>
      <ul className="column small-3 medium-8 main-menu">
        <li>
          <Link activeClassName="-current" to="/countries">Countries</Link>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {};

export default Header;

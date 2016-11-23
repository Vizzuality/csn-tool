import React from 'react';
import NavLink from 'containers/common/NavLink';


function MainNav() {
  return (
    <nav className="c-main-nav">
      <ul>
        <li>
          <NavLink to={"/countries"} i18nText="countries" />
        </li>
        <li>
          <NavLink to={"/sites"} i18nText="sites" />
        </li>
        <li>
          <NavLink to={"/species"} i18nText="species" />
        </li>
        <li>
          <NavLink className="-disabled" to="" i18nText="guidelines" />
        </li>
        <li>
          <NavLink className="-disabled" to="" i18nText="about" />
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

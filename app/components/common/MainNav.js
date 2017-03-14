import React from 'react';
import NavLink from 'containers/common/NavLink';


function MainNav() {
  return (
    <nav className="c-main-nav">
      <ul>
        <li>
          <NavLink to={"/countries"} i18nText="countries" parent />
        </li>
        <li>
          <NavLink to={"/sites"} i18nText="sites" parent />
        </li>
        <li>
          <NavLink to={"/species"} i18nText="species" parent />
        </li>
        <li>
          <NavLink to={"/threshold-lookup"} i18nText="thresholdLookup" parent />
        </li>
        <li>
          <NavLink className="-disabled" to="" i18nText="guidelines" parent />
        </li>
        <li>
          <NavLink className="-disabled" to="" i18nText="about" parent />
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

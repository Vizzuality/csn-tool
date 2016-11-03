import React from 'react';
import { Link } from 'react-router';
import { translations } from 'locales/translations';


class Header extends React.Component {
  constructor() {
    super();
    this.languages = Object.keys(translations).map((lang) => (
      { value: lang, label: lang.toUpperCase() }
    ));
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(lang) {
    this.props.updateLang(lang.value);
  }

  render() {
    return (
      <nav className="c-main-nav">
        <ul>
          <li>
            <Link activeClassName="-current" to={`/${this.props.lang}/countries`}>{this.context.t('countries')}</Link>
          </li>
          <li>
            <Link activeClassName="-current" to={`/${this.props.lang}/sites`}>{this.context.t('sites')}</Link>
          </li>
          <li>
            <Link activeClassName="-current" to={`/${this.props.lang}/species`}>{this.context.t('species')}</Link>
          </li>
          <li>
            <Link className="-disabled" activeClassName="-current" to="">{this.context.t('guidelines')}</Link>
          </li>
          <li>
            <Link className="-disabled" activeClassName="-current" to="">{this.context.t('about')}</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Header.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

Header.propTypes = {
  // Define the language selected
  lang: React.PropTypes.string.isRequired,
  // Define the function to upadate the url after language change
  updateLang: React.PropTypes.func.isRequired
};

export default Header;

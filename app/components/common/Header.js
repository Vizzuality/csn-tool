import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor() {
    super();
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(e) {
    this.props.updateLang(e.target.value);
  }

  render() {
    return (
      <header className="l-header">
        <div className="row align-middle c-header">
          <nav className="column small-10">
            <ul className="main-menu">
              <li>
                <Link activeClassName="-current" to={`/${this.props.lang}`}>{this.context.t('home')}</Link>
              </li>
              <li>
                <Link activeClassName="-current" to={`/${this.props.lang}/countries`}>{this.context.t('countries')}</Link>
              </li>
              <li>
                <Link activeClassName="-current" to={`/${this.props.lang}/countries`}>{this.context.t('species')}</Link>
              </li>
              <li>
                <Link className="-disabled" activeClassName="-current" to={`/${this.props.lang}/countries`}>{this.context.t('guidelines')}</Link>
              </li>
              <li>
                <Link className="-disabled" activeClassName="-current" to={`/${this.props.lang}/countries`}>{this.context.t('about')}</Link>
              </li>
            </ul>
          </nav>
          <div className="column small-2">
            <select value={this.props.lang} onChange={this.onSelectChange}>
              <option value="en">{this.context.t('english')}</option>
              <option value="es">{this.context.t('spanish')}</option>
            </select>
          </div>
        </div>
      </header>
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

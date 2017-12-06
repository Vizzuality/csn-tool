import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import Select from 'react-select';
import { translations } from 'locales/translations';

import MainNav from 'components/common/MainNav';


class Header extends React.Component {
  constructor() {
    super();
    this.languages = Object.keys(translations).map((lang) => (
      { value: lang, label: lang.toUpperCase() }
    ));
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(lang) {
    let pathname = this.props.location.pathname;
    pathname = pathname !== '/'
      ? pathname.replace(/^\/[a-zA-Z]{2}/g, lang.value)
      : lang.value;
    const search = this.props.location.search;
    // this.props.setLangURL(lang.value);
    const url = pathname + search;
    this.props.router.push(`/${url}`);
  }

  render() {
    return (
      <header className="l-header">
        <div className="row align-middle c-header">
          <div className="column small-12 medium-10 main-menu">
            <Link className="logo" to={`/${this.props.lang}`}>
              <svg className="icon-logo-small">
                <use xlinkHref="#logo-small"></use>
              </svg>
            </Link>
            <MainNav />
          </div>
          <div className="column small-12 medium-2">
            <Select
              name="language-switch"
              className="c-select -right -short"
              clearable={false}
              searchable={false}
              value={this.props.lang}
              options={this.languages}
              onChange={this.onSelectChange}
            />
          </div>
        </div>
      </header>
    );
  }
}

Header.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};

Header.propTypes = {
  // Define the language selected
  lang: PropTypes.string.isRequired,
  // Define router actions
  router: PropTypes.object,
  // Define current location
  location: PropTypes.object
};

export default withRouter(Header);

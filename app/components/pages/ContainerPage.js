import React from 'react';
import I18n from 'redux-i18n';
import Header from 'containers/common/Header';
import Footer from 'containers/common/Footer';

import { translations } from 'locales/translations';

class ContainerPage extends React.Component {

  getChildContext() {
    const location = this.props.location;
    location.params = this.props.params;
    return { location };
  }

  componentWillMount() {
    this.props.setLanguage(this.props.params.lang);
  }

  render() {
    return (
      <I18n translations={translations}>
        <div>
          <Header />
          <div className="l-main">
            {this.props.children}
          </div>
          <Footer />
        </div>
      </I18n>
    );
  }
}

ContainerPage.childContextTypes = {
  location: React.PropTypes.object
};

ContainerPage.propTypes = {
  /**
  * Define required content for page
  **/
  children: React.PropTypes.element.isRequired,
  /**
  * Define function to set the language
  **/
  setLanguage: React.PropTypes.func.isRequired,
  /**
  * Finds the router params
  **/
  params: React.PropTypes.object,
  /**
  * Finds the route of current location in URL
  **/
  location: React.PropTypes.object,
  /**
  * Finds route pathname string for current location
  **/
  path: React.PropTypes.string
};

export default ContainerPage;

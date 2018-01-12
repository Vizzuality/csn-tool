import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'redux-i18n';
import Header from 'containers/common/Header';
import FeedbackForm from 'components/common/Feedback';
import Footer from 'containers/common/Footer';

import { translations } from 'locales/translations';

class ContainerPage extends React.Component {

  getChildContext() {
    const location = this.props.location;
    location.params = this.props.params;
    return { location };
  }

  componentWillReceiveProps(newProps) {
    this.trackBackLinks(newProps);
  }

  trackBackLinks(newProps) {
    const oldPath = this.props.location.pathname.split('/')[2];
    const newPath = newProps.location.pathname.split('/')[2];
    const routeLength = newProps.location.pathname.split('/').length;
    if (routeLength <= 3) {
      window.previousLocation = newProps.location;
    } else if (oldPath !== newPath) {
      window.previousLocation = this.props.location;
    }
  }

  render() {
    return (
      <I18n translations={translations} initialLang={this.props.params.lang}>
        <div>
          <Header />
          <FeedbackForm />
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
  location: PropTypes.object
};

ContainerPage.propTypes = {
  /**
  * Define required content for page
  **/
  children: PropTypes.element.isRequired,
  /**
  * Finds the router params
  **/
  params: PropTypes.object,
  /**
  * Finds the route of current location in URL
  **/
  location: PropTypes.object
};

export default ContainerPage;

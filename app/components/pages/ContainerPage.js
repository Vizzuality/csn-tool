import React from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

class ContainerPage extends React.Component {

  getChildContext() {
    const location = this.props.location;
    location.params = this.props.params;
    return { location };
  }

  render() {
    return (
      <div>
        <Header />
        <div className="l-main">
          {this.props.children}
        </div>
        <Footer />
      </div>
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

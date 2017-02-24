import React from 'react';
import { withRouter } from 'react-router';
import { toggleParams } from 'helpers/router';

class ViewToggler extends React.Component {

  onToggleMode(mode) {
    const url = toggleParams(mode, 'table', this.props.router.getCurrentLocation());
    this.props.router.push(url);
  }

  render() {
    return (
      <ul className="c-view-toggler">
        <li
          className={this.props.viewMode !== 'table' ? 'is-active toggler' : 'toggler'}
          onClick={() => this.onToggleMode('map')}
        >
          {this.context.t('map')}
        </li>
        <li
          className={this.props.viewMode === 'table' ? 'is-active toggler' : 'toggler'}
          onClick={() => this.onToggleMode('table')}
        >
          {this.context.t('table')}
        </li>
      </ul>
    );
  }
}

ViewToggler.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

ViewToggler.propTypes = {
  viewMode: React.PropTypes.string,
  setViewMode: React.PropTypes.func,
  router: React.PropTypes.object
};

export default withRouter(ViewToggler);

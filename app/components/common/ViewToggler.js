import React from 'react';

class ViewToggler extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <ul className="c-view-toggler">
        <li className={this.props.viewMode === 'map' ? 'is-active toggler' : 'toggler'} onClick={() => this.props.setViewMode('map')} >Map</li>
        <li className={this.props.viewMode === 'list' ? 'is-active toggler' : 'toggler'} onClick={() => this.props.setViewMode('list')} >Table</li>
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
  setViewMode: React.PropTypes.func
};

export default ViewToggler;

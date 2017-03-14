import React from 'react';

class ThresholdTable extends React.Component {

  componentWillMount() {
    if (!this.props.list.data) {
      // REQUEST DATA
    }
  }

  render() {
    return (
      <div className="c-table">
        Threshold table will be here
      </div>
    );
  }
}

ThresholdTable.propTypes = {
  getSitesList: React.PropTypes.func.isRequired,
  list: React.PropTypes.object.isRequired,
  category: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired
};

export default ThresholdTable;

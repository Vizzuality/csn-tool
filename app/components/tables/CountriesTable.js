import React from 'react';


class CountriesTable extends React.Component {
  componentWillMount() {
    if (!this.props.data) {
      console.info('TODO: request data');
      // this.props.getCountryData(this.props.country);
    }
  }

  render() {
    return (
      <p>{this.props.data}</p>
    );
  }
}

CountriesTable.propTypes = {
  data: React.PropTypes.array
};

export default CountriesTable;

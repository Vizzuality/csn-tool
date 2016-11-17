import React from 'react';
import TableList from 'components/tables/TableList';
import LoadingSpinner from 'components/common/LoadingSpinner';

class CountriesTable extends React.Component {
  componentWillMount() {
    if (!this.props.data[this.props.country]) {
      this.props.getCountryData(this.props.country);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.country !== newProps.country) {
      if (!this.props.data[newProps.country]) {
        this.props.getCountryData(newProps.country);
      }
    }
  }

  render() {
    const data = this.props.data[this.props.country];
    if (!data || !data.length) return <div className="blank"><LoadingSpinner inner transparent /></div>;

    return (
      <TableList
        data={data}
        columns={['site_name', 'iso3', 'protection_status']}
      />
    );
  }
}

CountriesTable.propTypes = {
  getCountryData: React.PropTypes.func.isRequired,
  country: React.PropTypes.string,
  data: React.PropTypes.object
};

export default CountriesTable;

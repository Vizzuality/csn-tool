import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';
import TableList from 'containers/tables/TableList';

class CountriesPage extends React.Component {
  componentWillMount() {
    if (!this.props.countries.length) {
      this.props.getCountriesList();
    }
  }

  render() {
    return (
      <div className="l-page row">
        <div className="column">
          {!this.props.countries.length
            ? <LoadingSpinner transparent />
            : <TableList
              data={this.props.countries}
              columns={['country', 'iso3']}
            />
          }
        </div>
      </div>
    );
  }
}

CountriesPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CountriesPage.propTypes = {
  getCountriesList: React.PropTypes.func.isRequired,
  countries: React.PropTypes.array
};

export default CountriesPage;

import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';
import TableList from 'components/common/TableList';

class CountriesPage extends React.Component {
  componentWillMount() {
    if (!this.props.countries.length) {
      this.props.getCountriesList();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <h2>{this.context.t('countries')}</h2>

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

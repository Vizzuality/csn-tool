import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';

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
            : <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>ISO</th>
                </tr>
              </thead>
              <tbody>
                {this.props.countries.map((country, index) => (
                  <tr key={index}>
                    <td>{country.country}</td>
                    <td>{country.iso3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

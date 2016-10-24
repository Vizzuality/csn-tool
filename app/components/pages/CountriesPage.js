import React from 'react';

function CountriesPage(props) {
  return (
    <div className="row">
      <div className="column">
        I am the countries page
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>ISO</th>
            </tr>
          </thead>
          <tbody>
            {props.countries.map((country, index) => (
              <tr key={index}>
                <td>{country.name}</td>
                <td>{country.iso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CountriesPage.propTypes = {
  countries: React.PropTypes.array
};

export default CountriesPage;

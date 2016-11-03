import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';

class SpeciesPage extends React.Component {
  componentWillMount() {
    if (!this.props.species.length) {
      this.props.getSpeciesList();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <h2>{this.context.t('species')}</h2>

          {!this.props.species.length
            ? <LoadingSpinner transparent />
            : <table>
              <thead>
                <tr>
                  <th>Species</th>
                  <th>Common Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.props.species.map((species, index) => (
                  <tr key={index}>
                    <td>{species.scientific_name }</td>
                    <td>{species.english_name}</td>
                    <td><a href={species.hyperlink} target="_blank">View more</a></td>
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

SpeciesPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};


SpeciesPage.propTypes = {
  getSpeciesList: React.PropTypes.func.isRequired,
  species: React.PropTypes.array
};

export default SpeciesPage;

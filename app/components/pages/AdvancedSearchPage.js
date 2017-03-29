import React from 'react';
import Select from 'react-select';

const rows = [
  {
    title: 'geography',
    sections: ['countries', 'sites']
  },
  {
    title: 'taxonomy',
    sections: ['family', 'genus', 'species']
  },
  {
    title: 'habitat',
    sections: ['habitats']
  }
];

class AdvancedSearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      country: null,
      sites: null,
      family: null,
      genus: null,
      species: null
    };
  }
  componentWillMount() {
    if (!this.props.options) {
      this.props.getOptions();
    }
  }

  onSelectChange(section, value) {
    this.setState({
      [section]: value
    });
  }

  onSearchClick(section) {
    console.info(`TODO: search ${section}`);
  }

  render() {
    return (
      <div className="l-page">
        <div className="l-container">
          <div className="row">
            <div className="column">
              <h2 className="title">{this.context.t('advancedSearch')}</h2>
            </div>
          </div>
          {rows.map((row, index) => (
            <div className="row c-search-group" key={index}>
              <div className="column small-12">
                <h3 className="group-title">{this.context.t(row.title)}</h3>
              </div>
              {row.sections.map((section, index2) => {
                const value = this.state[section] || null;
                const options = this.props.options && this.props.options[section] || [];
                return (
                  <div className="column small-12 medium-3 group-field" key={index2}>
                    <h4 className="label">{this.context.t(section)}</h4>
                    <Select
                      className={`c-select -white ${value ? '-selected' : ''}`}
                      name={section}
                      value={value}
                      options={options}
                      onChange={(select) => this.onSelectChange(section, select)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
          <div className="row c-search-actions">
            <div className="column small-12 medium-2 medium-offset-6">
              <button
                className={`btn -small -dark ${this.state.sites ? '-disabled' : ''}`}
                onClick={() => this.onSearchClick('sites')}>
                {this.context.t('searchSites')}
              </button>
            </div>
            <div className="column small-12 medium-2">
              <button
                className={`btn -small -dark ${this.state.species ? '-disabled' : ''}`}
                onClick={() => this.onSearchClick('species')}>
                {this.context.t('searchSpecies')}
              </button>
            </div>
            <div className="column small-12 medium-2">
              <button
                className="btn -small -dark"
                onClick={() => this.onSearchClick('populations')}
              >
                {this.context.t('searchPopulations')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdvancedSearchPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

AdvancedSearchPage.propTypes = {
  options: React.PropTypes.object,
  getOptions: React.PropTypes.func
};

export default AdvancedSearchPage;

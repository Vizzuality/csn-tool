import React from 'react';
import Select from 'react-select';

const data = {
  country: [
    { value: 'one', label: 'Country one' },
    { value: 'two', label: 'Country two' }
  ],
  sites: [
    { value: 'one', label: 'Site one' },
    { value: 'two', label: 'Site two' }
  ],
  family: [
    { value: 'one', label: 'Family one' },
    { value: 'two', label: 'Family two' }
  ],
  genus: [
    { value: 'one', label: 'Genus one' },
    { value: 'two', label: 'Genus two' }
  ],
  species: [
    { value: 'one', label: 'Species one' },
    { value: 'two', label: 'Species two' }
  ]
};

const rows = [
  {
    title: 'Geography',
    sections: ['country', 'sites']
  },
  {
    title: 'Taxonomy',
    sections: ['family', 'genus', 'species']
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
    this.props.getData();
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
              <h2>{this.context.t('advancedSearch')}</h2>
            </div>
          </div>
          {rows.map((row, index) => (
            <div className="row c-search-group" key={index}>
              <div className="column small-12">
                <h3>{row.title}</h3>
              </div>
              {row.sections.map((section, index2) => (
                <div className="column small-12 medium-3" key={index2}>
                  <h4>{section}</h4>
                  <Select
                    name={section}
                    value={this.state[section]}
                    options={data[section]}
                    onChange={(value) => this.onSelectChange(section, value)}
                  />
                </div>
              ))}
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
  data: React.PropTypes.object.isRequired,
  getData: React.PropTypes.func
};

export default AdvancedSearchPage;

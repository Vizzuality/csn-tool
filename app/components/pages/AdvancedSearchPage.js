import React from 'react';
import Select from 'react-select';
import SearchResultsTable from 'containers/advanced-search/ResultsTable';
// import ResultsTableVirtualized from 'components/advanced-search/ResultsTableVirtualized';

const rows = [
  {
    title: 'geography',
    sections: ['country', 'site']
  },
  {
    title: 'taxonomy',
    sections: ['family', 'genus', 'species']
  },
  {
    title: 'habitat',
    sections: ['habitat']
  }
];

function filterSitesByCountry(countries, sites) {
  if (!countries) return sites;
  const countryIds = countries.map((country) => country.value);
  return sites.filter((site) => countryIds.indexOf(site.country_id) > -1);
}
function filterSpeciesByGenusAndFamily(genus, families, species) {
  if (!genus && !families) return species;
  if (!genus || !genus.length > 0) {
    const familyValues = families.map((item) => item.value);
    return species.filter((site) => familyValues.indexOf(site.family) > -1);
  }
  if (!families || !families.length > 0) {
    const genusValues = genus.map((item) => item.value);
    return species.filter((site) => genusValues.indexOf(site.genus) > -1);
  }
  const genusValues = genus.map((item) => item.value);
  const familyValues = families.map((item) => item.value);
  return species.filter((site) => genusValues.indexOf(site.genus) > -1 || familyValues.indexOf(site.family) > -1);
}

class AdvancedSearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      filters: {
        country: null,
        site: null,
        family: null,
        genus: null,
        species: null
      },
      errors: {
        empty: false
      }
    };
  }

  componentWillMount() {
    if (!this.props.options) {
      this.props.getOptions();
    }
  }

  onSelectChange(section, value) {
    this.setState((state) => {
      const filters = {
        ...state.filters,
        [section]: value
      };
      const hasValue = this.hasFilters(filters);
      return {
        filters,
        errors: {
          empty: !hasValue
        }
      };
    });
  }

  onSearchClick(category) {
    const { filters } = this.state;
    if (this.hasFilters(filters)) {
      this.props.onSearch(category, filters);
    } else {
      this.setState({
        errors: {
          empty: true
        }
      });
    }
  }

  getFilteredOptions(section, options) {
    const { filters } = this.state;
    switch (section) {
      case 'site':
        return filters.country && filters.country.length > 0
          ? filterSitesByCountry(filters.country, options)
          : options;
      case 'species':
        return filters.genus && filters.genus.length > 0 || filters.family && filters.family.length > 0
          ? filterSpeciesByGenusAndFamily(filters.genus, filters.family, options)
          : options;
      default:
        return options;
    }
  }

  hasFilters(filters) {
    const keys = Object.keys(filters);
    for (let i = 0, kLength = keys.length; i < kLength; i++) {
      if (filters[keys[i]]) return true;
    }
    return false;
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
                const value = this.state.filters[section] || null;
                const options = this.props.options && this.getFilteredOptions(section, this.props.options[section]) || [];
                return (
                  <div className="column small-12 medium-3 group-field" key={index2}>
                    <h4 className="label">{this.context.t(section)}</h4>
                    <Select
                      multi
                      className="c-select -white"
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
            <div className="column medium-offset-6 validation-error">
              {this.state.errors.empty &&
                <span>{this.context.t('selectOneOption')}</span>
              }
            </div>
            <div className="column small-12 medium-2 medium-offset-6">
              <button
                className={`btn -small -dark ${this.state.filters.site ? '-disabled' : ''}`}
                onClick={() => { if (!this.state.filters.site) this.onSearchClick('sites'); }}
              >
                {this.context.t('searchSites')}
              </button>
            </div>
            <div className="column small-12 medium-2">
              <button
                className={`btn -small -dark ${this.state.filters.species ? '-disabled' : ''}`}
                onClick={() => { if (!this.state.filters.species) this.onSearchClick('species'); }}
              >
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
          {this.props.hasResults &&
            <div className="row">
              <div className="column">
                <SearchResultsTable />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

AdvancedSearchPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

AdvancedSearchPage.propTypes = {
  hasResults: React.PropTypes.bool.isRequired,
  options: React.PropTypes.object,
  getOptions: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired
};

export default AdvancedSearchPage;

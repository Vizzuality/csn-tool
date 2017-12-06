import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import SitesTable from 'containers/sites/SitesTable';
import SpeciesTable from 'containers/species/SpeciesTable';
import PopulationsTable from 'containers/species/SpeciesDetailTable';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { StickyContainer } from 'react-sticky';

const rows = [
  {
    title: 'geography',
    sections: ['country', 'aewa_region', 'ramsar_region', 'site', 'protection', 'site_threat', 'site_habitat']
  },
  {
    title: 'taxonomy',
    sections: ['family', 'genus', 'species', 'red_list_status', 'aewa_annex_2',
      'species_threat', 'species_habitat_association']
  },
  {
    title: 'population',
    sections: ['aewa_table_1_status', 'eu_birds_directive', 'cms_caf_action_plan', 'multispecies_flyway', 'population_trend']
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
      searchType: '',
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
    this.setState({
      searchType: category
    });
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
      if (filters[keys[i]] && filters[keys[i]].length > 0) return true;
    }
    return false;
  }

  content() {
    const { filters } = this.state;
    const hasSites = filters.site && filters.site.length > 0;
    const hasSpecies = filters.species && filters.species.length > 0;

    let resultsTable = null;
    switch (this.state.searchType) {
      case 'sites':
        resultsTable = <SitesTable />;
        break;
      case 'species':
        resultsTable = <StickyContainer><SpeciesTable /></StickyContainer>;
        break;
      case 'populations':
        resultsTable = <StickyContainer><PopulationsTable id={'PopulationsTable'} /></StickyContainer>;
        break;
      default:
        resultsTable = [];
        break;
    }

    return (
      <div>
        {rows.map((row, index) => (
          <div className="row c-search-group" key={index}>
            <div className="column small-12">
              <h3 className="group-title">{this.context.t(row.title)}</h3>
            </div>
            {row.sections.map((section, index2) => {
              const value = filters[section] || null;
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
              id="searchSitesButton"
              className={`btn -small -dark ${hasSites ? '-disabled' : ''}`}
              onClick={() => { if (!hasSites) this.onSearchClick('sites'); }}
            >
              {this.context.t('searchSites')}
            </button>
          </div>
          <div className="column small-12 medium-2">
            <button
              id="searchSpeciesButton"
              className={`btn -small -dark ${hasSpecies ? '-disabled' : ''}`}
              onClick={() => { if (!hasSpecies) this.onSearchClick('species'); }}
            >
              {this.context.t('searchSpecies')}
            </button>
          </div>
          <div className="column small-12 medium-2 ">
            <button
              id="searchPopulationsButton"
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
              {resultsTable}
            </div>
          </div>
        }
      </div>
    );
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
          {this.props.options
            ? this.content()
            : <LoadingSpinner />
          }
        </div>
      </div>
    );
  }
}

AdvancedSearchPage.contextTypes = {
  t: PropTypes.func.isRequired
};

AdvancedSearchPage.propTypes = {
  hasResults: PropTypes.bool.isRequired,
  options: PropTypes.object,
  getOptions: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default AdvancedSearchPage;

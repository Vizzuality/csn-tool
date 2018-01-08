import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { StickyContainer } from 'react-sticky';

import Button from 'components/common/Button';
import LoadingSpinner from 'components/common/LoadingSpinner';
import SearchTable from 'containers/advanced-search/SearchTable';

const SEARCH_GROUPS = {
  geography: ['country', 'aewa_region', 'ramsar_region', 'site', 'protection', 'site_threat', 'site_habitat'],
  taxonomy: ['family', 'genus', 'species', 'red_list_status', 'aewa_annex_2', 'species_threat', 'species_habitat_association'],
  population: ['aewa_table_1_status', 'eu_birds_directive', 'cms_caf_action_plan', 'multispecies_flyway', 'population_trend']
};
const SINGLE_SELECTS = ['aewa_annex_2', 'eu_birds_directive', 'cms_caf_action_plan'];

function filterSitesByCountry(countries, sites) {
  if (!countries) return sites;
  const countryIds = countries.map((country) => country.value);
  return sites.filter((site) => countryIds.indexOf(site.country_id) > -1);
}
function filterSpeciesByGenusAndFamily(genus, families, species) {
  if (!genus && !families) return species;
  if (!genus) {
    const familyValues = families.map((item) => item.value);
    return species.filter((site) => familyValues.indexOf(site.family) > -1);
  }
  if (!families) {
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
      filters: {},
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
      if (!value || (Array.isArray(value) && !value.length)) {
        delete filters[section];
      }
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
        return filters.country
          ? filterSitesByCountry(filters.country, options) : options;
      case 'species':
        return filters.genus && filters.family
          ? filterSpeciesByGenusAndFamily(filters.genus, filters.family, options)
          : options;
      default:
        return options;
    }
  }

  hasFilters(filters) {
    return Object.keys(filters).length > 0;
  }

  isFilterSelected({ filter, group }) {
    if (group) return SEARCH_GROUPS[group].some((f) => this.isFilterSelected({ filter: f }));

    const { filters } = this.state;

    return !!(filters[filter]);
  }

  renderContent() {
    const { filters } = this.state;
    const { data, isFetching } = this.props;

    const hasSites = this.isFilterSelected({ filter: 'site' });
    const hasSpecies = this.isFilterSelected({ filter: 'species' });
    const hasBeenSearched = isFetching || data;
    const anyPopulationFilter = this.isFilterSelected({ group: 'population' });
    const searchIBAsDisabled = hasSites || anyPopulationFilter;

    return (
      <div>
        {Object.keys(SEARCH_GROUPS).map((group, index) => (
          <div className="row c-search-group" key={index}>
            <div className="column small-12">
              <h3 className="group-title">{this.context.t(group.title)}</h3>
            </div>
            {SEARCH_GROUPS[group].map((section, index2) => {
              const value = filters[section] || null;
              const options = this.props.options && this.getFilteredOptions(section, this.props.options[section]) || [];
              const isMulti = !SINGLE_SELECTS.includes(section);

              return (
                <div className="column small-12 medium-3 group-field" key={index2}>
                  <h4 className="label">{this.context.t(section)}</h4>
                  <Select
                    multi={isMulti}
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
          <div className="column medium-2 validation-error">
            {this.state.errors.empty &&
              <span>{this.context.t('selectOneOption')}</span>
            }
          </div>
          <div className="column small-12 medium-10 action-buttons">
            <Button
              id="searchIBAsButton"
              className="-small -dark"
              disabled={searchIBAsDisabled}
              onClick={() => this.onSearchClick('ibas')}
            >
              {this.context.t('searchIBAs')}
            </Button>
            <Button
              id="searchCriticalSitesButton"
              className="-small -dark"
              disabled={hasSites}
              onClick={() => this.onSearchClick('criticalSites')}
            >
              {this.context.t('searchCriticalSites')}
            </Button>
            <Button
              id="searchSpeciesButton"
              className="-small -dark"
              onClick={() => this.onSearchClick('species')}
              disabled={hasSpecies}
            >
              {this.context.t('searchSpecies')}
            </Button>
            <Button
              id="searchPopulationsButton"
              className="-small -dark"
              onClick={() => this.onSearchClick('populations')}
            >
              {this.context.t('searchPopulations')}
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="column">
            {hasBeenSearched &&
              <StickyContainer>
                <SearchTable />
              </StickyContainer>
            }
          </div>
        </div>
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
            ? this.renderContent()
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
  data: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  columns: PropTypes.any,
  allColumns: PropTypes.any,
  options: PropTypes.object,
  getOptions: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default AdvancedSearchPage;

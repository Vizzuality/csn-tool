import React from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';

import CountriesFilters from 'components/countries/CountriesFilters';
import LoadingSpinner from 'components/common/LoadingSpinner';
import ScrollButton from 'components/common/ScrollButton';
import SpeciesPopulationHeader from 'components/species/SpeciesPopulationHeader';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/countries/TableListHeader';

class CountriesTable extends React.Component {
  componentWillMount() {
    this.props.cleanSearchFilter('');
  }

  getSelectedHeader() {
    const { selectedLASpeciesPopulation } = this.props;

    if (!selectedLASpeciesPopulation) return null;

    return (
      <SpeciesPopulationHeader
        species={selectedLASpeciesPopulation}
        backLinkTo={`/countries/${selectedLASpeciesPopulation.iso3}/lookAlikeSpecies`}
      />
    );
  }

  getDetailLink(category) {
    switch (category) {
      case 'populations':
        return 'species';
      case 'criticalSites':
        return 'sites/csn';
      case 'lookAlikeSpecies':
        return 'countrySpeciesPopulation';
      case 'lookAlikeSpeciesPopulation':
        return 'species';
      case 'sites':
        return 'sites/iba';
      default:
        return category;
    }
  }

  getLoading() {
    return (
      <div className="table-loading">
        <LoadingSpinner inner />
      </div>
    );
  }

  render() {
    const {
      allColumns,
      category,
      columns,
      country,
      data,
      selectedLASpeciesPopulation
    } = this.props;

    const detailLink = this.getDetailLink(category);
    const isLookAlikeSpecies = category.startsWith('lookAlikeSpecies');
    const isExpanded = !!(isLookAlikeSpecies && selectedLASpeciesPopulation);

    return (
      <div id="countriesTable" className="c-table">
        <ScrollButton />
        <Sticky topOffset={-120} stickyClassName={'-sticky'}>
          <CountriesFilters data={data || []} columns={columns} country={country} category={category} />
          {isExpanded && data.length > 0
            ? this.getSelectedHeader()
            : null
          }
          <TableListHeader
            data={data}
            columns={columns}
            allColumns={allColumns}
            detailLink
          />
        </Sticky>
        {isExpanded && data.length === 0
          ? this.getLoading()
          : <TableList
            data={data}
            columns={columns}
            detailLink={detailLink}
          />
        }
      </div>
    );
  }
}

CountriesTable.contextTypes = {
  t: PropTypes.func.isRequired
};

CountriesTable.propTypes = {
  allColumns: PropTypes.array.isRequired,
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.any,
  cleanSearchFilter: PropTypes.func,
  selectedLASpeciesPopulation: PropTypes.any
};

export default CountriesTable;

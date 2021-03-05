import React from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';
import { RESULTS_PER_TABLE_PAGE } from 'constants/config';
import CountriesFilters from 'components/countries/CountriesFilters';
import LoadingSpinner from 'components/common/LoadingSpinner';
import ScrollButton from 'components/common/ScrollButton';
import SpeciesPopulationHeader from 'components/species/SpeciesPopulationHeader';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/countries/TableListHeader';
import Pagination from 'react-js-pagination';

class CountriesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.handleTableItemClick = this.handleTableItemClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

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

  handleTableItemClick(item) {
    if (this.props.selectedLASpeciesPopulation) {
      this.props.selectCountriesTableItem(item);
    }
  }

  handlePageChange(pageNumber) {
    const pageSize = RESULTS_PER_TABLE_PAGE;
    const { getCountryLookAlikeSpecies, country } = this.props;
    const offset = (pageNumber - 1) * pageSize + 1;
    getCountryLookAlikeSpecies(country, {
      offset,
      limit: pageSize
    });
    this.setState({ activePage: pageNumber });
  }

  render() {
    const {
      allColumns,
      category,
      columns,
      country,
      data,
      selectedLASpeciesPopulation,
      selectedTableItem,
      preload,
      tableCounts
    } = this.props;

    const detailLink = this.getDetailLink(category);
    const isLookAlikeSpecies = category.startsWith('lookAlikeSpecies');
    const isLookAlikeSpeciesPage = category === 'lookAlikeSpecies';
    const isExpanded = !!(isLookAlikeSpecies && selectedLASpeciesPopulation);
    const isPreload = preload[category];
    const count = tableCounts ? tableCounts[category] : 0;

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
        {isPreload
          ? this.getLoading()
          : <TableList
            data={data}
            columns={columns}
            detailLink={detailLink}
            onItemClick={this.handleTableItemClick}
            selectable={isExpanded}
            selectedItem={selectedTableItem}
            isLookAlike={isLookAlikeSpecies}
          />
        }
        {isLookAlikeSpeciesPage && (
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={RESULTS_PER_TABLE_PAGE}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        )}
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
  selectedTableItem: PropTypes.any,
  selectedLASpeciesPopulation: PropTypes.any,
  selectCountriesTableItem: PropTypes.func.isRequired,
  preload: PropTypes.object,
  tableCounts: PropTypes.object,
  getCountryLookAlikeSpecies: PropTypes.func
};

export default CountriesTable;

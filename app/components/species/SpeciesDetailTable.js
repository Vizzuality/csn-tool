import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/common/LoadingSpinner';
import SpeciesDetailFilters from 'components/species/SpeciesDetailFilters';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/species/TableListHeader';
import ScrollButton from 'components/common/ScrollButton';
import { Sticky } from 'react-sticky';

class SpeciesDetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.clearSelection = this.clearSelection.bind(this);
    this.getLookAlikeSpecies = this.getLookAlikeSpecies.bind(this);
    this.handleTableItemClick = this.handleTableItemClick.bind(this);
  }

  getLookAlikeSpecies(species) {
    const url = `${config.apiHost}/species/${species.species_id}/look-alike-species/${species.pop_id_origin}`;

    fetch(url)
      .then(res => {
        if (res.ok) return res.json();
        throw Error(res.statusText);
      })
      .then(data => {
        this.props.selectLASpeciesPopulation({
          species,
          aLikeSpecies: data
        });
      });
  }

  getSelectedHeader() {
    const selectedSpecies = this.props.selectedLASpeciesPopulation.species;

    return (
      <div className="table-navigation">
        <button className="btn -back" onClick={this.clearSelection}>
          <span className="link">{this.context.t('backToSpecies')}</span>
        </button>
        <div className="nav">
          <div>
            <span className="title">{this.context.t('species')}</span>
            <h3>{selectedSpecies.original_species}</h3>
          </div>
          <div>
            <span className="title">{this.context.t('population')}</span>
            <span>{selectedSpecies.population}</span>
          </div>
          <div>
            <span className="title">A</span>
            <span>{selectedSpecies.original_a || '-'}</span>
          </div>
          <div>
            <span className="title">B</span>
            <span>{selectedSpecies.original_b || '-'}</span>
          </div>
          <div>
            <span className="title">C</span>
            <span>{selectedSpecies.original_c || '-'}</span>
          </div>
        </div>
      </div>
    );
  }

  getDetailLink(category) {
    switch (category) {
      case 'populations':
        return 'species';
      case 'population':
        return null; // no display
      case 'criticalSites':
        return 'sites/csn';
      case 'lookAlikeSpecies':
        if (this.props.selectedLASpeciesPopulation) return 'species';
        return {
          type: 'action',
          action: this.getLookAlikeSpecies
        };
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
      this.props.selectLASpeciesPopulationSpecies(item);
    }
  }

  clearSelection() {
    this.props.selectLASpeciesPopulation(null);
  }

  renderTableHeader(isLookAlikeSpecies, data, columns, allColumns) {
    const isExpanded = !!(isLookAlikeSpecies && this.props.selectedLASpeciesPopulation);

    return (
      <div>
        <SpeciesDetailFilters
          data={data}
          columns={columns}
          isSearch={this.props.isSearch}
          id={this.props.id}
          category={this.props.category}
        />
        {isExpanded && this.getSelectedHeader()}
        <TableListHeader
          expanded={isExpanded}
          data={data}
          columns={columns}
          allColumns={allColumns}
          detailLink
        />
      </div>
    );
  }

  render() {
    const {
      allColumns,
      category,
      columns,
      data,
      isSearch,
      selectedLASpeciesPopulation
    } = this.props;

    const detailLink = this.getDetailLink(category);
    const isLookAlikeSpecies = category === 'lookAlikeSpecies';
    const isSelectable = !!(isLookAlikeSpecies && selectedLASpeciesPopulation);
    const selectedItem = isLookAlikeSpecies && selectedLASpeciesPopulation
            ? selectedLASpeciesPopulation.selectedALikeSpecies
            : null;

    return (
      <div className="c-table" >
        {!isSearch && <ScrollButton />}
        {isSearch ? (
          <div>
            {this.renderTableHeader(isLookAlikeSpecies, data, columns, allColumns)}
          </div>
        ) : (
          <Sticky topOffset={-120} stickyClassName={'-sticky'}>
            {this.renderTableHeader(isLookAlikeSpecies, data, columns, allColumns)}
          </Sticky>
        )}
        <TableList
          data={data}
          columns={columns}
          detailLink={detailLink}
          onItemClick={this.handleTableItemClick}
          selectable={isSelectable}
          selectedItem={selectedItem}
        />
      </div>
    );
  }
}

SpeciesDetailTable.contextTypes = {
  t: PropTypes.func.isRequired
};

SpeciesDetailTable.childContextTypes = {
  t: PropTypes.func.isRequired
};

SpeciesDetailTable.propTypes = {
  allColumns: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  isSearch: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  selectedLASpeciesPopulation: PropTypes.any,
  selectLASpeciesPopulation: PropTypes.func.isRequired,
  selectLASpeciesPopulationSpecies: PropTypes.func.isRequired
};

export default SpeciesDetailTable;

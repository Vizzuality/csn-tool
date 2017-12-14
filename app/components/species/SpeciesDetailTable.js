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
    this.state = {
      data: [],
      selectedItem: null
    };
    this.clearSelection = this.clearSelection.bind(this);
    this.getLookAlikeSpecies = this.getLookAlikeSpecies.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.category !== 'lookAlikeSpecies') {
      this.setState({
        selectedItem: null
      });
    }
  }

  getLookAlikeSpecies(species) {
    const url = `${config.apiHost}/species/${species.species_id}/look-alike-species/${species.pop_id_origin}`;

    this.setState({
      selectedItem: species
    });
    this.props.mapSelectPopulation(species.pop_id_origin);

    fetch(url)
      .then(res => {
        if (res.ok) return res.json();
        throw Error(res.statusText);
      })
      .then(data => {
        this.setState({ data });
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  getSelectedHeader() {
    return (
      <div className="table-navigation">
        <button className="btn -back" onClick={this.clearSelection}>
          <span className="link">{this.context.t('backToSpecies')}</span>
        </button>
        <div className="nav">
          <div>
            <span className="title">{this.context.t('species')}</span>
            <h3>{this.state.selectedItem.original_species}</h3>
          </div>
          <div>
            <span className="title">{this.context.t('population')}</span>
            <span>{this.state.selectedItem.population}</span>
          </div>
          <div>
            <span className="title">A</span>
            <span>{this.state.selectedItem.original_a || '-'}</span>
          </div>
          <div>
            <span className="title">B</span>
            <span>{this.state.selectedItem.original_b || '-'}</span>
          </div>
          <div>
            <span className="title">C</span>
            <span>{this.state.selectedItem.original_c || '-'}</span>
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
        if (this.state.selectedItem) return 'species';
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

  clearSelection() {
    this.setState({
      data: [],
      selectedItem: null
    });
    this.props.mapSelectPopulation(null);
  }

  renderTableHeader(isLookAlikeSpecies, data, columns, allColumns) {
    return (
      <div>
        <SpeciesDetailFilters
          data={data}
          columns={columns}
          isSearch={this.props.isSearch}
          id={this.props.id}
          category={this.props.category}
        />
        {isLookAlikeSpecies && this.state.selectedItem && this.state.data.length > 0
          ? this.getSelectedHeader()
          : null
        }
        <TableListHeader
          expanded={isLookAlikeSpecies}
          data={data}
          columns={columns}
          allColumns={allColumns}
          detailLink
        />
      </div>
    );
  }

  render() {
    const detailLink = this.getDetailLink(this.props.category);
    const isLookAlikeSpecies = this.props.category === 'lookAlikeSpecies';
    const data = isLookAlikeSpecies && this.state.selectedItem && this.state.data.length > 0 ? this.state.data : this.props.data;
    const columns = isLookAlikeSpecies && this.state.selectedItem && this.state.data.length > 0 ? this.props.expandedColumns : this.props.columns;
    const allColumns = isLookAlikeSpecies && this.state.selectedItem && this.state.data.length > 0 ? this.props.allExpandedColumns : this.props.allColumns;

    return (
      <div className="c-table" >
        {!this.props.isSearch && <ScrollButton />}
        {this.props.isSearch ?
          <div>
            {this.renderTableHeader(isLookAlikeSpecies, data, columns, allColumns)}
          </div> :
          <Sticky topOffset={-120} stickyClassName={'-sticky'}>
            {this.renderTableHeader(isLookAlikeSpecies, data, columns, allColumns)}
          </Sticky>
        }
        <TableList
          data={data}
          columns={columns}
          detailLink={detailLink}
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
  allExpandedColumns: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  isSearch: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  expandedColumns: PropTypes.array.isRequired,
  mapSelectPopulation: PropTypes.func.isRequired
};

export default SpeciesDetailTable;

import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';
import CountriesFilters from 'components/countries/CountriesFilters';
import TableListHeader from 'containers/countries/TableListHeader';
import TableList from 'components/tables/TableList';
import ScrollButton from 'components/common/ScrollButton';
import { Sticky } from 'react-sticky';

const expandedColumns = ['confusion_species', 'populations', 'a', 'b', 'c'];

class CountriesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedItem: null
    };
    this.clearSelection = this.clearSelection.bind(this);
    this.getLookAlikeSpecies = this.getLookAlikeSpecies.bind(this);
  }

  componentWillMount() {
    this.props.cleanSearchFilter('');
  }

  getLookAlikeSpecies(species) {
    this.setState({
      selectedItem: species
    });
    const url = `${config.apiHost}/countries/${this.props.country}/look-alike-species/${species.pop_id_origin}`;
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
        <button onClick={this.clearSelection}>
          <span className="link">{this.context.t('backToSpecies')}</span>
        </button>
        <div className="nav">
          <div>
            <span className="title">{this.context.t('species')}</span>
            <h3>{this.state.selectedItem.original_species}</h3>
          </div>
          <div>
            <span className="title">{this.context.t('population')}</span>
            <span>{this.state.selectedItem.populations}</span>
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
      case 'sitesOld':
        return '';
      case 'lookAlikeSpecies':
        if (this.state.selectedItem) return 'species';
        return {
          type: 'action',
          action: this.getLookAlikeSpecies
        };
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
  }

  render() {
    const detailLink = this.getDetailLink(this.props.category);
    const isLookAlikeSpecies = this.props.category === 'lookAlikeSpecies';
    const data = isLookAlikeSpecies && this.state.selectedItem && this.state.data.length > 0 ? this.state.data : this.props.data;
    const columns = isLookAlikeSpecies && this.state.selectedItem && this.state.data.length > 0 ? expandedColumns : this.props.columns;
    return (
      <div className="c-table">
        <ScrollButton />
        <Sticky topOffset={-120} stickyClassName={'-sticky'}>
          <CountriesFilters country={this.props.country} category={this.props.category} />
          {isLookAlikeSpecies && this.state.selectedItem && this.state.data.length > 0
            ? this.getSelectedHeader()
            : null
          }
          <TableListHeader
            dataSample={this.props.data[0] || {}}
            columns={columns}
            detailLink
          />
        </Sticky>
        {isLookAlikeSpecies && this.state.selectedItem && this.state.data.length === 0
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
  t: React.PropTypes.func.isRequired
};

CountriesTable.propTypes = {
  country: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any,
  cleanSearchFilter: React.PropTypes.func
};

export default CountriesTable;

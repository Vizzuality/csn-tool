import React from 'react';
import CountriesFilters from 'containers/countries/CountriesFilters';
import TableList from 'containers/tables/TableList';
import ScrollButton from 'containers/common/ScrollButton';

function getDetailLink(category) {
  switch (category) {
    case 'populations':
      return 'species';
    case 'sitesOld':
      return '';
    case 'lookAlikeSpecies':
      return 'species';
    default:
      return category;
  }
}

class CountriesTable extends React.Component {

  componentWillMount() {
    this.props.cleanSearchFilter('');
  }

  componentDidMount() {
    this.props.setScrollLimit(this.topPosition(this.tableContainer));
  }

  topPosition(domEl) {
    if (!domEl) {
      return 0;
    }
    return domEl.offsetTop + this.topPosition(domEl.offsetParent);
  }

  render() {
    const detailLink = getDetailLink(this.props.category);
    const tableClass = this.props.scroll ? 'c-table -fixed' : 'c-table';
    return (
      <div
        id="table-list"
        className={`${tableClass}`}
        ref={(ref) => { this.tableContainer = ref; }}
      >
        <ScrollButton />
        <CountriesFilters country={this.props.country} category={this.props.category} />
        <TableList
          data={this.props.data}
          columns={this.props.columns}
          detailLink={detailLink}
        />
      </div>
    );
  }
}

CountriesTable.propTypes = {
  country: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any,
  cleanSearchFilter: React.PropTypes.func,
  setScrollLimit: React.PropTypes.func,
  scroll: React.PropTypes.bool,
  scrollLimit: React.PropTypes.number
};

export default CountriesTable;

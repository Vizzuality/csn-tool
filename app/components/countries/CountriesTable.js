import React from 'react';
import CountriesFilters from 'components/countries/CountriesFilters';
import TableListHeader from 'containers/tables/TableListHeader';
import TableList from 'components/tables/TableList';
import ScrollButton from 'containers/common/ScrollButton';
import { Sticky } from 'react-sticky';

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

  render() {
    const detailLink = getDetailLink(this.props.category);
    return (
      <div
        id="table-list"
        className="c-table"
      >
        <ScrollButton />
        <Sticky topOffset={-120} stickyClassName={'-sticky'}>
          <CountriesFilters country={this.props.country} category={this.props.category} />
          <TableListHeader
            data={this.props.data}
            columns={this.props.columns}
            detailLink={detailLink}
          />
        </Sticky>
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
  cleanSearchFilter: React.PropTypes.func
};

export default CountriesTable;

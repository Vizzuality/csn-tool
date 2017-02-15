import React from 'react';
import CountriesFilters from 'components/countries/CountriesFilters';
import TableList from 'components/tables/TableList';
import ScrollButton from 'components/common/ScrollButton';

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
      <div className="c-table">
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
  cleanSearchFilter: React.PropTypes.func
};

export default CountriesTable;

import React from 'react';
import CountriesFilters from 'components/countries/CountriesFilters';
import TableList from 'components/tables/TableList';

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

function CountriesTable(props) {
  const detailLink = getDetailLink(props.category);
  return (
    <div>
      <CountriesFilters country={props.country} category={props.category} />
      <TableList
        data={props.data}
        columns={props.columns}
        detailLink={detailLink}
      />
    </div>
  );
}

CountriesTable.propTypes = {
  country: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any
};

export default CountriesTable;

import React from 'react';
import CountriesFilters from 'components/countries/CountriesFilters';
import TableList from 'components/tables/TableList';

function CountriesTable(props) {
  let columns = [];
  switch (props.category) {
    case 'species':
      columns = ['scientific_name', 'english_name', 'family', 'genus', 'populations'];
      break;
    case 'populations':
      columns = ['populations', 'scientific_name', 'english_name', 'family', 'genus'];
      break;
    default:
      columns = ['site_name', 'iso3', 'protection_status', 'iba', 'csn'];
  }

  return (
    <div className="">
      <CountriesFilters country={props.country} />
      <TableList
        data={props.data}
        columns={columns}
      />
    </div>
  );
}

CountriesTable.propTypes = {
  country: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  data: React.PropTypes.any
};

export default CountriesTable;

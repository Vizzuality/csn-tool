import React from 'react';
import CountriesFilters from 'components/countries/CountriesFilters';
import TableList from 'components/tables/TableList';

function CountriesTable(props) {
  let columns = [];
  const detailLink = props.category === 'populations' ? '' : props.category;
  switch (props.category) {
    case 'species':
      columns = ['scientific_name', 'english_name', 'populations', 'genus', 'family'];
      break;
    case 'populations':
      columns = ['scientific_name', 'english_name', 'populations', 'genus', 'family'];
      break;
    default:
      columns = ['country', 'site_name', 'protection_status', 'iba', 'csn'];
  }

  return (
    <div className="">
      <CountriesFilters country={props.country} />
      <TableList
        data={props.data}
        columns={columns}
        detailLink={detailLink}
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

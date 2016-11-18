import React from 'react';
import TableList from 'components/tables/TableList';
import LoadingSpinner from 'components/common/LoadingSpinner';

function CountriesTable(props) {
  if (!props.data || !props.data.length) return <div className="blank"><LoadingSpinner inner transparent /></div>;

  return (
    <TableList
      data={props.data}
      columns={['site_name', 'iso3', 'protection_status']}
    />
  );
}

CountriesTable.propTypes = {
  data: React.PropTypes.array
};

export default CountriesTable;

import React from 'react';
import CountriesFilters from 'components/countries/CountriesFilters';
import TableList from 'components/tables/TableList';
import ScrollButton from 'components/common/ScrollButton';

function CountriesTable(props) {
  const detailLink = ['populations', 'sitesOld'].indexOf(props.category) > 0 ? '' : props.category;

  return (
    <div className="c-table" >
      <ScrollButton />
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

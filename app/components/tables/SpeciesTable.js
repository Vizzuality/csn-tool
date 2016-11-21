import React from 'react';
import TableList from 'components/tables/TableList';

function SpeciesTable(props) {
  const columns = ['scientific_name', 'english_name', 'iba_criteria', 'season', 'max', 'min', 'avg'];
  return (
    <TableList
      data={props.data}
      columns={columns}
      detailLink="species"
    />
  );
}

SpeciesTable.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default SpeciesTable;

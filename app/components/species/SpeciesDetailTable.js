import React from 'react';
import SpeciesDetailFilters from 'components/species/SpeciesDetailFilters';
import TableList from 'components/tables/TableList';

function SpeciesDetailTable(props) {
  return (
    <div>
      <SpeciesDetailFilters id={props.id} category={props.category} />
      <TableList
        data={props.data}
        columns={props.columns}
      />
    </div>
  );
}

SpeciesDetailTable.propTypes = {
  id: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default SpeciesDetailTable;

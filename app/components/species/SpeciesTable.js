import React from 'react';
import TableList from 'components/tables/TableList';
import SpeciesFilters from 'components/species/SpeciesFilters';

function SpeciesTable(props) {
  return (
    <div>
      <SpeciesFilters />
      <TableList
        data={props.data}
        columns={props.columns}
        detailLink="species"
      />
    </div>
  );
}

SpeciesTable.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SpeciesTable.propTypes = {
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default SpeciesTable;

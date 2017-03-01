import React from 'react';
import TableListHeader from 'containers/species/TableListHeader';
import TableList from 'components/tables/TableList';
import SpeciesFilters from 'components/species/SpeciesFilters';
import { Sticky } from 'react-sticky';

function SpeciesTable(props) {
  return (
    <div>
      <Sticky topOffset={-50} stickyClassName={'-sticky -small'}>
        <SpeciesFilters />
        <TableListHeader
          data={props.data}
          columns={props.columns}
          detailLink="species"
        />
      </Sticky>
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

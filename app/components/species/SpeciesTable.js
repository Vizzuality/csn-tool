import React from 'react';
import TableList from 'components/tables/TableList';

function SpeciesTable(props, context) {
  const columns = ['scientific_name', 'english_name', 'population', 'genus', 'family'];
  return (
    <div>
      <h2>{context.t('speciesList')}</h2>
      <TableList
        data={props.data}
        columns={columns}
        detailLink="species"
      />
    </div>
  );
}

SpeciesTable.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SpeciesTable.propTypes = {
  data: React.PropTypes.any.isRequired
};

export default SpeciesTable;

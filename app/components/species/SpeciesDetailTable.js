import React from 'react';
import TableList from 'components/tables/TableList';

function SpeciesDetailTable(props, context) {
  const columns = ['country', 'site_name', 'population', 'csn', 'iba', 'min', 'max', 'avg'];
  return (
    <div>
      <h2>{context.t('sitesList')}</h2>
      <TableList
        data={props.data}
        columns={columns}
      />
    </div>
  );
}

SpeciesDetailTable.contextTypes = {
  t: React.PropTypes.func.isRequired
};


SpeciesDetailTable.propTypes = {
  data: React.PropTypes.any.isRequired
};

export default SpeciesDetailTable;

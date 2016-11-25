import React from 'react';
import SpeciesDetailFilters from 'components/species/SpeciesDetailFilters';
import TableList from 'components/tables/TableList';

function SpeciesDetailTable(props, context) {
  const columns = ['country', 'site_name', 'population', 'csn', 'iba', 'minimum', 'maximum', 'avg'];

  return (
    <div>
      <h2>{context.t('sitesList')}</h2>
      <SpeciesDetailFilters slug={props.slug} category={props.category} />
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

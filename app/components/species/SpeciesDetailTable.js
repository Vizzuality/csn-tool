import React from 'react';
import SpeciesDetailFilters from 'components/species/SpeciesDetailFilters';
import TableList from 'components/tables/TableList';

function SpeciesDetailTable(props, context) {
  return (
    <div>
      <h2>{context.t('sitesList')}</h2>
      <SpeciesDetailFilters slug={props.slug} category={props.category} />
      <TableList
        data={props.data}
        columns={props.columns}
      />
    </div>
  );
}

SpeciesDetailTable.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SpeciesDetailTable.propTypes = {
  slug: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default SpeciesDetailTable;

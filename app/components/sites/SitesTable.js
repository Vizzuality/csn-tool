import React from 'react';
import SitesFilters from 'components/sites/SitesFilters';
import TableList from 'components/tables/TableList';

function SitesTable(props, context) {
  const title = props.selected ? context.t('triggerSpeciesList') : context.t('sitesList');
  let detailLink = props.selected ? 'species' : 'sites';

  if (props.category === 'threats') {
    detailLink = '';
  }

  return (
    <div className="">
      <h2>{title}</h2>
      {props.selected
        ? <SitesFilters slug={props.selected} category={props.category} />
        : ''
      }
      <TableList
        data={props.data}
        columns={props.columns}
        detailLink={detailLink}
      />
    </div>
  );
}

SitesTable.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SitesTable.propTypes = {
  selected: React.PropTypes.string,
  data: React.PropTypes.any,
  category: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired
};

export default SitesTable;

import React from 'react';
import TableList from 'components/tables/TableList';

function SitesTable(props, context) {
  let columns = [];
  const title = props.selected ? context.t('triggerSpeciesList') : context.t('sitesList');
  const detailLink = props.selected ? 'species' : 'sites';
  if (props.selected) {
    columns = ['scientific_name', 'english_name', 'population', 'season', 'csn_criteria', 'iba_criteria'];
  } else {
    columns = ['country', 'site_name', 'protection_status', 'csn', 'iba'];
  }

  return (
    <div className="">
      <h2>{title}</h2>
      <TableList
        data={props.data}
        columns={columns}
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
  data: React.PropTypes.any
};

export default SitesTable;

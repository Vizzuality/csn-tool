import React from 'react';
import SitesDetailFilters from 'components/sites/SitesDetailFilters';
import TableList from 'components/tables/TableList';
import ScrollButton from 'components/common/ScrollButton';

function SitesDetailTable(props) {
  const detailLink = props.category === 'species' ? props.category : '';
  return (
    <div className="c-table" >
      <ScrollButton />
      <SitesDetailFilters id={props.slug} category={props.category} />
      <TableList
        data={props.data}
        columns={props.columns}
        detailLink={detailLink}
      />
    </div>
  );
}

SitesDetailTable.propTypes = {
  slug: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default SitesDetailTable;

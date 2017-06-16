import React from 'react';
import SitesDetailFilters from 'components/sites/SitesDetailFilters';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/sites/TableListHeader';
import ScrollButton from 'components/common/ScrollButton';
import { Sticky } from 'react-sticky';

function SitesDetailTable(props) {
  const detailLink = props.category === 'species' ? props.category : '';
  return (
    <div className="c-table" >
      <ScrollButton />
      <Sticky topOffset={-120} stickyClassName={'-sticky'}>
        <SitesDetailFilters id={props.slug} data={props.data} columns={props.columns} category={props.category} type={props.type} />
        <TableListHeader
          data={props.data}
          columns={props.columns}
          allColumns={props.allColumns}
          detailLink
        />
      </Sticky>
      <TableList
        data={props.data}
        columns={props.columns}
        detailLink={detailLink}
      />
    </div>
  );
}

SitesDetailTable.propTypes = {
  allColumns: React.PropTypes.array.isRequired,
  slug: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired,
  type: React.PropTypes.string.isRequired
};

export default SitesDetailTable;

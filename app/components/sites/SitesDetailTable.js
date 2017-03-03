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
        <SitesDetailFilters id={props.slug} category={props.category} />
        <TableListHeader
          dataSample={props.data[0] || {}}
          columns={props.columns}
          detailLink={detailLink}
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
  slug: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default SitesDetailTable;

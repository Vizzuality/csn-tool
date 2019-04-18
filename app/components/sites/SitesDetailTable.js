import React from 'react';
import PropTypes from 'prop-types';
import SitesDetailFilters from 'components/sites/SitesDetailFilters';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/sites/TableListHeader';
import ScrollButton from 'components/common/ScrollButton';
import { Sticky } from 'react-sticky';

function SitesDetailTable(props) {
  const detailLink = ['species', 'csnVulnerability'].indexOf(props.category) > -1 ? 'species' : '';
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
  allColumns: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default SitesDetailTable;

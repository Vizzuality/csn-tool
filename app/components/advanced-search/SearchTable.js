import React from 'react';
import PropTypes from 'prop-types';
import TableListHeader from 'containers/advanced-search/TableListHeader';
import TableList from 'components/tables/TableList';

const SearchTable = ({ data, allColumns, columns }) => ((
  <div id="searchTable">
    <div>
      <TableListHeader
        data={data}
        columns={columns}
        allColumns={allColumns}
        detailLink
      />
    </div>
    <TableList
      data={data}
      columns={columns}
      detailLink="species"
    />
  </div>
));

SearchTable.contextTypes = {
  t: PropTypes.func.isRequired
};

SearchTable.propTypes = {
  allColumns: PropTypes.array.isRequired,
  data: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired
};

export default SearchTable;

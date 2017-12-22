import React from 'react';
import PropTypes from 'prop-types';

import TableListHeader from 'containers/advanced-search/TableListHeader';
import TableList from 'components/tables/TableList';
import CSVButton from 'components/tables/CSVButton.js';
import SearchFilter from 'containers/advanced-search/Filter';

const SearchTable = ({ data, allColumns, columns, category }) => {
  const detailLinkHash = {
    species: 'species',
    ibas: 'sites/iba',
    criticalSites: 'sites/csn',
    populations: null
  };
  const detailLink = detailLinkHash[category];

  return (
    <div id="searchTable">
      <div className="row c-table-filters">
        <div className="column small-12 medium-8">
          <div style={{ display: 'inline-block', marginTop: 14, verticalAlign: 'top' }}>
            <CSVButton data={data} columns={columns} />
          </div>
        </div>
        <div className="column small-12 medium-4">
          <SearchFilter placeholder="sitesFilter" />
        </div>
      </div>
      <TableListHeader
        data={data}
        columns={columns}
        allColumns={allColumns}
        detailLink
      />
      <TableList
        data={data}
        columns={columns}
        detailLink={detailLink}
      />
    </div>
  );
};

SearchTable.contextTypes = {
  t: PropTypes.func.isRequired
};

SearchTable.propTypes = {
  allColumns: PropTypes.array.isRequired,
  data: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  category: PropTypes.string
};

export default SearchTable;

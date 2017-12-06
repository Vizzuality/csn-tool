import React from 'react';
import PropTypes from 'prop-types';
import TableList from 'components/tables/TableList';

function ResultsTable(props) {
  return (
    <TableList
      data={props.data}
      columns={props.columns}
    />
  );
}

ResultsTable.propTypes = {
  data: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired
};

export default ResultsTable;

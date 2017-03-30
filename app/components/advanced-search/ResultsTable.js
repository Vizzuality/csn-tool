import React from 'react';
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
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default ResultsTable;

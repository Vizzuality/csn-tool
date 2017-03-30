import React from 'react';
// import TableList from 'components/tables/TableList';
import { Column, Table, AutoSizer } from 'react-virtualized';

function getColumnSize(column) {
  switch (column) {
    case 'value':
      return 50;
    case 'label':
      return 200;
    default:
      return 200;
  }
}

function ResultsTable(props) {
  const { data, columns } = props;
  if (!data || data && !data.length > 0) return null;
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          width={width}
          height={600}
          headerHeight={20}
          rowHeight={30}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
        >
          {columns.map((column, index) => (
            <Column
              key={index}
              label={column}
              dataKey={column}
              width={getColumnSize(column)}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
}

ResultsTable.propTypes = {
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default ResultsTable;

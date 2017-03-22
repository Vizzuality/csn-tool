import React from 'react';
import { Sticky } from 'react-sticky';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/threshold/TableListHeader';
import ThresholdFilters from 'components/threshold/ThresholdFilters';
import ScrollButton from 'components/common/ScrollButton';

function ThresholdTable(props) {
  return (
    <div className="c-table">
      <ScrollButton />
      <Sticky topOffset={-120} stickyClassName={'-sticky'}>
        <ThresholdFilters />
        <TableListHeader
          data={props.data}
          columns={props.columns}
        />
      </Sticky>
      <TableList
        data={props.data}
        columns={props.columns}
      />
    </div>
  );
}

ThresholdTable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default ThresholdTable;

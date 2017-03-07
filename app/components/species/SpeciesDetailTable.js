import React from 'react';
import SpeciesDetailFilters from 'components/species/SpeciesDetailFilters';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/species/TableListHeader';
import ScrollButton from 'components/common/ScrollButton';
import { Sticky } from 'react-sticky';

function SpeciesDetailTable(props) {
  const detailLink = props.category === 'sites' ? props.category : '';
  return (
    <div className="c-table" >
      <ScrollButton />
      <Sticky topOffset={-120} stickyClassName={'-sticky'}>
        <SpeciesDetailFilters id={props.id} category={props.category} />
        <TableListHeader
          data={props.data}
          columns={props.columns}
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

SpeciesDetailTable.propTypes = {
  id: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default SpeciesDetailTable;

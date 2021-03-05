import React from 'react';
import PropTypes from 'prop-types';
import TableListHeader from 'containers/species/TableListHeader';
import TableList from 'components/tables/TableList';
import SpeciesFilters from 'components/species/SpeciesFilters';
import { Sticky } from 'react-sticky';

class SpeciesTable extends React.Component {

  renderCommonTableHeader() {
    const { data, columns, allColumns } = this.props;
    return (
      <div>
        <SpeciesFilters data={data || []} columns={columns} />
        <TableListHeader
          data={data}
          columns={columns}
          allColumns={allColumns}
          detailLink
        />
      </div>
    );
  }

  render() {
    const { data, columns } = this.props;
    return (
      <div id="speciesTable">
        <Sticky topOffset={-50} stickyClassName="-sticky -small">
          {this.renderCommonTableHeader()}
        </Sticky>
        <TableList
          data={data}
          columns={columns}
          detailLink="species"
        />
      </div>
    );
  }
}

SpeciesTable.contextTypes = {
  t: PropTypes.func.isRequired
};

SpeciesTable.propTypes = {
  allColumns: PropTypes.array.isRequired,
  data: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired
};

export default SpeciesTable;

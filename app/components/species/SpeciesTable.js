import React from 'react';
import TableListHeader from 'containers/species/TableListHeader';
import TableList from 'components/tables/TableList';
import SpeciesFilters from 'components/species/SpeciesFilters';
import { Sticky } from 'react-sticky';


class SpeciesTable extends React.Component {

  renderCommonTableHeader() {
    const { data, columns, allColumns, isSearch } = this.props;

    return (
      <div>
        <SpeciesFilters data={data} columns={columns} isSearch={isSearch} />
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
    const { data, columns, isSearch } = this.props;
    return (
      <div id="speciesTable">
        {!isSearch ?
          <Sticky topOffset={-50} stickyClassName="-sticky -small">
            {this.renderCommonTableHeader()}
          </Sticky> :
          <div>
            {this.renderCommonTableHeader()}
          </div>
        }
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
  t: React.PropTypes.func.isRequired
};

SpeciesTable.propTypes = {
  allColumns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired,
  columns: React.PropTypes.array.isRequired,
  isSearch: React.PropTypes.bool.isRequired
};

export default SpeciesTable;

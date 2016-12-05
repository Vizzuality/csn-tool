import React from 'react';
import SitesFilters from 'components/sites/SitesFilters';
import InfiniteScroll from 'components/common/InfiniteScroll';
import TableList from 'components/tables/TableList';

class SitesTable extends React.Component {

  componentWillMount() {
    if (!this.props.list.data) {
      this.props.getSitesList(this.props.list.page);
    }
  }

  render() {
    const detailLink = ['populations'].indexOf(this.props.category) < 0
      ? 'sites'
      : '';

    return (
      <div className="c-paginated-table">
        <SitesFilters category={this.props.category} />
        <InfiniteScroll
          page={this.props.list.page}
          hasMore={this.props.list.hasMore}
          loadMore={() => this.props.getSitesList(this.props.list.page + 1)}
        >
          <TableList
            data={this.props.list.data}
            columns={this.props.columns}
            detailLink={detailLink}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

SitesTable.propTypes = {
  getSitesList: React.PropTypes.func.isRequired,
  list: React.PropTypes.object.isRequired,
  category: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired
};

export default SitesTable;

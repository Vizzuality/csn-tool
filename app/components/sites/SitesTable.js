import React from 'react';
import SitesFilters from 'components/sites/SitesFilters';
import InfiniteScroll from 'components/common/InfiniteScroll';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/sites/TableListHeader';
import { withRouter } from 'react-router';

class SitesTable extends React.Component {

  componentWillMount() {
    if (!this.props.list.data) {
      this.props.getSitesList(this.props.list.page, null, this.props.router.location.query.filter);
    }
  }

  render() {
    const detailLink = ['populations'].indexOf(this.props.category) < 0
      ? 'sites'
      : '';
    return (
      <div className="c-paginated-table c-table">
        <InfiniteScroll
          page={this.props.list.page}
          hasMore={this.props.list.hasMore}
          loadMore={() => this.props.getSitesList(this.props.list.page + 1, this.props.list.search)}
        >
          <div className="sticky-table">
            <div className="sticky-header column">
              <SitesFilters category={this.props.category} />
              <TableListHeader
                includeSort={false}
                data={this.props.list.data}
                columns={this.props.columns}
                detailLink
              />
            </div>
            <div className="sticky-content">
              <TableList
                data={this.props.list.data}
                columns={this.props.columns}
                detailLink={detailLink}
              />
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

SitesTable.propTypes = {
  getSitesList: React.PropTypes.func.isRequired,
  list: React.PropTypes.object.isRequired,
  category: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  router: React.PropTypes.object
};

export default withRouter(SitesTable);

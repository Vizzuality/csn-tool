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

  getAllSites(search, filter) {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `${config.apiHost}/sites?${searchQuery}&filter=${filter}`;
    return fetch(url).then(response => response.json());
  }

  render() {
    const filter = this.props.router.location.query.filter;
    const search = this.props.list.search;
    const detailLink = this.props.router ? `sites/${filter}` : 'sites/iba';

    return (
      <div id="sitesTable" className="c-paginated-table c-table">
        <InfiniteScroll
          page={this.props.list.page}
          hasMore={this.props.list.hasMore}
          loadMore={() => this.props.getSitesList(this.props.list.page + 1, search)}
        >
          <div className={!this.props.isSearch && 'sticky-table'}>
            <div className={!this.props.isSearch ? 'sticky-header column' : 'column'} >
              <SitesFilters loadData={() => this.getAllSites(search, filter)} columns={this.props.columns} isSearch={this.props.isSearch} category={this.props.category} type={this.props.type} />
              <TableListHeader
                includeSort={false}
                data={this.props.list.data}
                columns={this.props.columns}
                allColumns={this.props.allColumns}
                detailLink
              />
            </div>
            <div className={!this.props.isSearch && 'sticky-content'}>
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
  allColumns: React.PropTypes.array.isRequired,
  getSitesList: React.PropTypes.func.isRequired,
  list: React.PropTypes.object.isRequired,
  category: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  isSearch: React.PropTypes.bool.isRequired,
  router: React.PropTypes.object,
  sticky: React.PropTypes.bool,
  type: React.PropTypes.string
};

export default withRouter(SitesTable);

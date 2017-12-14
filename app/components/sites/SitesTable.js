import React from 'react';
import PropTypes from 'prop-types';
import SitesFilters from 'components/sites/SitesFilters';
import InfiniteScroll from 'components/common/InfiniteScroll';
import TableList from 'components/tables/TableList';
import TableListHeader from 'containers/sites/TableListHeader';

class SitesTable extends React.Component {

  componentWillMount() {
    if (!this.props.list.data) {
      this.props.getSitesList(this.props.list.page, null, this.props.filter);
    }
  }

  getAllSites(search, filter) {
    const searchQuery = search ? `&search=${search}` : '';
    const url = `${config.apiHost}/sites?${searchQuery}&filter=${filter}`;
    return fetch(url).then(response => response.json());
  }

  render() {
    const filter = this.props.filter;
    const search = this.props.list.search;
    const detailLink = `sites/${filter}`;

    return (
      <div id="sitesTable" className="c-paginated-table c-table">
        <InfiniteScroll
          page={this.props.list.page}
          hasMore={this.props.list.hasMore}
          loadMore={() => this.props.getSitesList(this.props.list.page + 1, search, this.props.filter)}
        >
          <div className={!this.props.isSearch && 'sticky-table'}>
            <div className={!this.props.isSearch ? 'sticky-header column' : 'column'} >
              <SitesFilters
                csvData={() => this.getAllSites(search, filter)}
                columns={this.props.columns}
                isSearch={this.props.isSearch}
                category={this.props.category}
                type={this.props.type}
              />
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
  allColumns: PropTypes.array.isRequired,
  getSitesList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  category: PropTypes.string,
  filter: PropTypes.string,
  columns: PropTypes.array.isRequired,
  isSearch: PropTypes.bool.isRequired,
  sticky: PropTypes.bool,
  type: PropTypes.string
};

export default SitesTable;

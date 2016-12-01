import React from 'react';
import SitesFilters from 'components/sites/SitesFilters';
import TableList from 'components/tables/TableList';
import LoadingSpinner from 'components/common/LoadingSpinner';

class SitesTable extends React.Component {
  constructor() {
    super();
    this.threshold = 200; // threshold to scroll request
    this.handleScroll = this.handleScroll.bind(this);
    this.timeout = null;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.props.clearSites();
  }

  handleScroll() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const scroll = document.body.scrollTop;
      const positionTop = this.loadingEl.offsetTop;
      if (scroll >= positionTop - this.threshold && this.props.loading) {
        this.props.endReached();
      }
    }, 100);
  }

  render() {
    let detailLink = this.props.selected ? 'species' : 'sites';

    if (['threats', 'habitats'].indexOf(this.props.category) >= 0) {
      detailLink = '';
    }

    return (
      <div className="c-paginated-table">
        <SitesFilters id={this.props.selected || false} category={this.props.category} />
        <TableList
          data={this.props.data}
          columns={this.props.columns}
          detailLink={detailLink}
        />
        <div className="loading -relative" ref={(loading) => { this.loadingEl = loading; }}>
          {!this.props.selected && this.props.loading &&
            <LoadingSpinner inner />
          }
        </div>
      </div>
    );
  }
}

SitesTable.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SitesTable.propTypes = {
  clearSites: React.PropTypes.func.isRequired,
  endReached: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  selected: React.PropTypes.string,
  data: React.PropTypes.any,
  category: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired
};

export default SitesTable;

import React from 'react';
import SitesFilters from 'components/sites/SitesFilters';
import TableList from 'components/tables/TableList';
import LoadingSpinner from 'components/common/LoadingSpinner';

class SitesTable extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
    this.threshold = 200; // threshold to scroll request
    this.handleScroll = this.handleScroll.bind(this);
    this.timeout = null;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.length && this.props.data.length === newProps.data.length) {
      this.setAllData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.props.clearSites();
  }

  setAllData() {
    this.setState({ loading: false });
  }

  handleScroll() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const scroll = document.body.scrollTop;
      const positionTop = this.loading.offsetTop;
      if (scroll >= positionTop - this.threshold && this.state.loading) {
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
        {this.props.selected
          ? <SitesFilters id={this.props.selected} category={this.props.category} />
          : ''
        }
        <TableList
          data={this.props.data}
          columns={this.props.columns}
          detailLink={detailLink}
        />
        <div className="loading -relative" ref={(loading) => { this.loading = loading; }}>
          {!this.props.selected && this.state.loading &&
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
  selected: React.PropTypes.string,
  data: React.PropTypes.any,
  category: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired
};

export default SitesTable;

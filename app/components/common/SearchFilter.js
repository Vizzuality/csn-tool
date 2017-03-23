import React from 'react';
import { withRouter } from 'react-router';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.debouncedChange = this.handleChange.bind(this);
    this.timeout = null;
  }

  componentWillUnmount() {
    if (this.props.resetSearchFilter) {
      this.props.resetSearchFilter();
    }
  }

  handleChange(event) {
    const filter = event.target.value;
    this.setState({ search: filter });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.setSearchFilter(filter, this.props.router.location.query.filter);
    }, 400);
  }

  render() {
    return (
      <div className="c-table-search">
        <label className="text -input-label" htmlFor="tableSearch">{this.context.t('filterBy')}</label>
        <input
          id="tableSearch"
          type="text"
          value={this.state.search}
          placeholder={this.context.t(this.props.placeholder)}
          onChange={this.debouncedChange}
        />
        <svg className="icon icon-search">
          <use xlinkHref="#icon-search"></use>
        </svg>
      </div>
    );
  }
}

SearchFilter.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

SearchFilter.propTypes = {
  placeholder: React.PropTypes.string,
  setSearchFilter: React.PropTypes.func.isRequired,
  resetSearchFilter: React.PropTypes.func,
  router: React.PropTypes.object
};

export default withRouter(SearchFilter);

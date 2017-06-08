import React from 'react';
import { withRouter } from 'react-router';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      label: this.props.label || 'filterBy',
      labelType: this.props.labelType || 'dark',
      searchType: this.props.searchType || 'light'
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
    const { label, labelType, searchType } = this.state;
    const labelClass = (labelType === 'light') ? 'text -input-label -light' : 'text -input-label';
    const searchClass = (searchType === 'light' ? 'c-table-search' : 'c-header-search');

    return (
      <div className={searchClass}>
        <label className={labelClass} htmlFor="tableSearch">{this.context.t(label)}</label>
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
  label: React.PropTypes.string,
  labelType: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  setSearchFilter: React.PropTypes.func.isRequired,
  resetSearchFilter: React.PropTypes.func,
  router: React.PropTypes.object,
  searchType: React.PropTypes.string
};

export default withRouter(SearchFilter);

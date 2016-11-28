import React from 'react';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.searchFilter || ''
    };
    this.debouncedChange = this.handleChange.bind(this);
    this.timeout = null;
  }

  handleChange(event) {
    const filter = event.target.value;
    this.setState({ search: filter });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.setSearchFilter(filter);
    }, 400);
  }

  render() {
    return (
      <div className="c-table-search">
        <label className="text -input-label" htmlFor="tableSearch">search by</label>
        <input id="tableSearch" type="text" value={this.state.search} placeholder={this.context.t('search')} onChange={this.debouncedChange} />
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
  setSearchFilter: React.PropTypes.func.isRequired,
  searchFilter: React.PropTypes.string
};

export default SearchFilter;

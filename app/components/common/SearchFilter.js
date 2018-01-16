import React from 'react';
import PropTypes from 'prop-types';
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
          onKeyPress={this.props.onKeyPress}
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
  t: PropTypes.func.isRequired
};

SearchFilter.propTypes = {
  label: PropTypes.string,
  labelType: PropTypes.string,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  resetSearchFilter: PropTypes.func,
  router: PropTypes.object,
  searchType: PropTypes.string,
  setSearchFilter: PropTypes.func.isRequired
};

export default withRouter(SearchFilter);

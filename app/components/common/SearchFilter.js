import React from 'react';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
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
      <input type="text" value={this.state.search} placeholder={this.context.t('search')} onChange={this.debouncedChange} />
    );
  }
}

SearchFilter.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

SearchFilter.propTypes = {
  setSearchFilter: React.PropTypes.func.isRequired
};

export default SearchFilter;

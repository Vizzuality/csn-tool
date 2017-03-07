import React from 'react';

// Filters only for columns a, b and c
const columnsWithFilter = ['a', 'b', 'c', 'original_a', 'original_b', 'original_c'];

function getFilters(columns, data) {
  const filters = {};
  if (columns && columns.length) {
    columns.forEach((column) => {
      if (columnsWithFilter.indexOf(column) >= 0) {
        if (!filters[column]) filters[column] = [];
        data.forEach((item) => {
          const newItem = item[column] && item[column].toString().replace('  ', ' ') || null;
          if (newItem && filters[column].indexOf(newItem) === -1) {
            filters[column].push(newItem);
          }
        });
      }
    });
  }
  Object.keys(filters).forEach(function (key) { // eslint-disable-line
    filters[key].sort();
  });
  return filters;
}

class TableListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.pending = true;
    this.filters = null;
    if (props.data) {
      this.filters = getFilters(props.columns, props.data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedCategory !== nextProps.selectedCategory) {
      this.pending = true;
      this.filterBy({ value: 'reset' });
    }
    if (this.pending && this.props.data.length !== nextProps.data.length) {
      this.pending = false;
      this.filters = getFilters(nextProps.columns, nextProps.data);
    }
  }


  filterBy(filter) {
    if (this.props.filterBy) {
      if (filter.value === 'reset') {
        this.props.filterBy({ field: null, value: null });
      } else {
        this.props.filterBy(filter);
      }
    }
  }

  sortBy(sort) {
    if (this.props.sort.field !== sort.field || this.props.sort.order !== sort.order) {
      this.props.sortBy(sort);
    }
  }

  render() {
    if (!this.props.columns || !this.props.data) return null;

    const colWidth = this.props.detailLink ? (97.5 / this.props.columns.length) : (100 / this.props.columns.length);
    const colCenter = ['a', 'b', 'c', 'original_a', 'original_b', 'original_c', 'iba', 'csn', 'iba_species', 'csn_species'];

    return (
      <div id="table-rows-header" className="c-table-list">
        <ul>
          <li className="header">
            {this.props.columns.map((column, index) => {
              let alignClass = '';
              if (colCenter.indexOf(column) > -1) {
                alignClass = '-center';
              } else if (this.props.data[0] && typeof this.props.data[0][column] === 'number') {
                alignClass = '-right';
              } else {
                alignClass = '-left';
              }
              return (
                <div key={index} className={`text -title ${alignClass}`} style={{ width: `${colWidth}%` }}>
                  {this.context.t(column)}
                  {columnsWithFilter.indexOf(column) >= 0 &&
                    <div className="table-filter">
                      <select onChange={(event) => this.filterBy({ field: column, value: event.target.value })}>
                        <option value="reset">Reset filter</option>
                        {this.filters[column] && this.filters[column].map((item, i) => (
                          <option key={i} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  }
                  {this.props.includeSort &&
                    <div className="sort">
                      <button
                        className={`arrow -asc ${this.props.sort.field === column && this.props.sort.order === 'asc' ? '-active' : ''}`}
                        onClick={() => this.sortBy({ field: column, order: 'asc' })}
                      />
                      <button
                        className={`arrow -desc ${this.props.sort.field === column && this.props.sort.order === 'desc' ? '-active' : ''}`}
                        onClick={() => this.sortBy({ field: column, order: 'desc' })}
                      />
                    </div>
                }
                </div>
              );
            })}
            {this.props.detailLink &&
              <div className="text -title link" style={{ width: '2.5%' }}>
                ...
              </div>
            }
          </li>
        </ul>
      </div>
    );
  }
}

TableListHeader.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableListHeader.defaultProps = {
  includeSort: true
};

TableListHeader.propTypes = {
  detailLink: React.PropTypes.bool,
  selectedCategory: React.PropTypes.string.isRequired,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired,
  includeSort: React.PropTypes.bool,
  sort: React.PropTypes.object.isRequired,
  sortBy: React.PropTypes.func.isRequired,
  filterBy: React.PropTypes.func
};

export default TableListHeader;

import React from 'react';

// Filters only for columns a, b and c
const columnsWithFilter = [
  { column: 'a',
    type: 'abc' },
  { column: 'b',
    type: 'abc' },
  { column: 'c',
    type: 'abc' },
  { column: 'original_a',
    type: 'abc' },
  { column: 'original_b',
    type: 'abc' },
  { column: 'original_c',
    type: 'abc' }
];

const DETAIL_LINK_WIDTH_PERCENT = 2.5;
const OVERHEADER = 'AEWA Table 1 Column A';
const OVERHEADER_LIST = [
  {
    title: OVERHEADER,
    columns: ['a', 'b', 'c']
  },
  {
    title: OVERHEADER,
    columns: ['original_a', 'original_b', 'original_c']
  }
];

class HeaderFilter {
  constructor(label, filter) {
    this.label = this.formattedLabel = label;
    const thisFilter = filter || label;
    this.filter = [thisFilter];
  }

  clearFilter() {
    this.filter = [];
  }

  addFilter(filterAddition) {
    this.filter = this.filter.concat(filterAddition.filter);
  }

  prefixLabel(prefix) {
    this.formattedLabel = prefix + this.formattedLabel;
  }
}

function getFilters(columns, data) {
  const filters = {};
  const INDENT = ' - ';
  if (columns && columns.length) {
    columns.forEach((column) => {
      const columnFilter = columnsWithFilter.filter((col) => col.column === column)[0];
      if (columnFilter) {
        const col = columnFilter.column;
        if (!filters[col]) {
          filters[col] = [];
        }

        let foundFilters = [];
        data.forEach((item) => {
          if (item[col]) {
            item[col].toString().split(' ').forEach((el) => {
              const newItem = el.trim() || null;
              const foundFilter = foundFilters.filter((filter) => filter.label === newItem)[0];
              const label = foundFilter && foundFilter.label || null;
              if (newItem && label !== newItem) {
                const filterObject = new HeaderFilter(newItem);
                foundFilters.push(filterObject);
              }
            });
          }
        });

        foundFilters.sort((a, b) => a.label > b.label);

        // Creating hierarchy filter for 'abc'
        if (columnFilter.type && columnFilter.type === 'abc') {
          foundFilters = foundFilters.reduce((prev, current) => {
            const previousItem = prev[prev.length - 1];
            const previousNumeral = previousItem && previousItem.label[0] || '';
            const currentNumeral = current.label[0];

            if (currentNumeral !== previousNumeral) { // Parent doesn't exist
              const parentFilterObject = new HeaderFilter(currentNumeral);
              parentFilterObject.clearFilter();
              prev.push(parentFilterObject);
            }

            // Adding current to parent
            const parentFilter = prev.filter((item) => item.label === currentNumeral)[0];
            parentFilter.addFilter(current);

            // Changing formatting and adding to list
            current.prefixLabel(INDENT);
            prev.push(current);

            return prev;
          }, []);
        }
        filters[columnFilter.column] = foundFilters;
      }
    });
  }

  return filters;
}

function getTitle(column) {
  if (column === 'a' || column === 'b' || column === 'c') {
    return 'AEWA Table 1 Column';
  }
  return '';
}

class TableListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.pending = true;
    this.filters = null;
    this.activeFilters = {};
    if (props.data) {
      this.filters = getFilters(props.columns, props.data);
      this.pending = false;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedCategory !== nextProps.selectedCategory) {
      this.pending = true;
      this.filterBy({ field: 'all', value: 'reset' });
    }
    if (this.pending && nextProps.data.length && this.props.data.length !== nextProps.data.length) {
      this.pending = false;
      this.filters = getFilters(nextProps.columns, nextProps.data);
    }
  }

  getAlignClass(column) {
    const colCenter = ['a', 'b', 'c', 'original_a', 'original_b', 'original_c', 'iba', 'csn', 'iba_species', 'csn_species'];

    let alignClass = '';
    if (colCenter.indexOf(column) > -1) {
      alignClass = '-center';
    } else if (this.props.data[0] && typeof this.props.data[0][column] === 'number') {
      alignClass = '-right';
    } else {
      alignClass = '-left';
    }
    return alignClass;
  }

  filterBy(filter) {
    if (this.props.filterBy) {
      if (filter.value === 'reset' && filter.field === 'all') {
        this.activeFilters = {};
      } else if (filter.value === 'reset') {
        delete this.activeFilters[filter.field];
      } else {
        this.activeFilters[filter.field] = filter.value;
      }
      this.props.filterBy(this.activeFilters);
    }
  }

  sortBy(sort) {
    if (this.props.sort.field !== sort.field || this.props.sort.order !== sort.order) {
      this.props.sortBy(sort);
    }
  }

  renderHeader(children) {
    return (
      <div id="table-rows-header" className="c-table-list">
        <ul>
          {children}
        </ul>
      </div>
    );
  }

  renderHeaderColumn({ children, index, colWidth, extraClass, column, style }) {
    return (
      <div
        key={index}
        className={`text -title ${extraClass}`}
        style={{ width: `${colWidth}%`, ...style }}
        title={column && getTitle(column)}
      >
        {children}
      </div>
    );
  }

  renderFilter(column) {
    return (
      <div key={`${column}Filter`} className="table-filter">
        <select onChange={(event) => this.filterBy({ field: column, value: event.target.value })}>
          <option value="reset">Reset filter</option>
          {this.filters && this.filters[column] && this.filters[column].map((item, i) =>
            <option key={i} value={JSON.stringify(item.filter)}>{item.formattedLabel}</option>
          )}
        </select>
      </div>
    );
  }

  renderSort(column) {
    return (
      <div key={`${column}Sort`} className="sort">
        <button
          className={`arrow -asc ${this.props.sort.field === column && this.props.sort.order === 'asc' ? '-active' : ''}`}
          onClick={() => this.sortBy({ field: column, order: 'asc' })}
        />
        <button
          className={`arrow -desc ${this.props.sort.field === column && this.props.sort.order === 'desc' ? '-active' : ''}`}
          onClick={() => this.sortBy({ field: column, order: 'desc' })}
        />
      </div>
    );
  }

  renderHeaderColumnInner(column) {
    const blockChildren = [
      this.context.t(column)
    ];

    if (columnsWithFilter.some((col) => col.column === column)) {
      blockChildren.push(this.renderFilter(column));
    }

    if (this.props.includeSort) {
      blockChildren.push(this.renderSort(column));
    }

    return blockChildren;
  }

  render() {
    if (!this.props.columns || !this.props.data) return null;

    const colWidth = this.props.detailLink ?
      ((100 - DETAIL_LINK_WIDTH_PERCENT) / this.props.columns.length) : (100 / this.props.columns.length);

    // Finding column sets that need overheaders
    const columnChunks = this.props.columns.reduce((previous, col, colIndex) => {
      // Prevents double-adding a previously added column
      if (previous.length > 0 && previous.reduce((a, b) => (
        (typeof b === 'object') ? a.concat(b.columns) : a.concat(b)
      ), []).length >= colIndex + 1) {
        return previous;
      }

      const foundList = OVERHEADER_LIST.filter((item) => (
        this.props.columns.slice(colIndex, colIndex + item.columns.length).toString() === item.columns.toString()
      ))[0];

      previous.push(
        (foundList && foundList.columns.length > 0) ? foundList : col
      );

      return previous;
    }, []);

    const header = (
      <li className="header">
        {columnChunks.map((item, index) => {
          let columnInner = null;
          let thisColWidth = colWidth;
          const style = {};

          if (typeof item === 'string') { // Normal column
            columnInner = this.renderHeaderColumnInner(item);
          } else { // Column sets that need overheader
            thisColWidth = colWidth * item.columns.length;
            style.display = 'block';
            style.paddingRight = 0;

            columnInner = [
              <div key={`${index}Overheader`} className="overheader">{item.title}</div>,
              <div key={`${index}OverheaderCols`}>{item.columns.map((col) =>
                this.renderHeaderColumn({
                  children: this.renderHeaderColumnInner(col),
                  index: `${index}${col}`,
                  colWidth: (item.columns.length > 0) ? 100 / item.columns.length : 0,
                  extraClass: `${this.getAlignClass(col)} inner-column`,
                  column: item
                })
              )}</div>
            ];
          }

          return (
            this.renderHeaderColumn({
              children: columnInner,
              index,
              colWidth: thisColWidth,
              extraClass: this.getAlignClass(item),
              style,
              column: item
            })
          );
        })
      }

      {this.props.detailLink &&
        <div className="text -title link" style={{ width: `${DETAIL_LINK_WIDTH_PERCENT}%` }}>
          ...
        </div>
      }
      </li>
    );

    return this.renderHeader(header);
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
  selectedCategory: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired,
  includeSort: React.PropTypes.bool,
  sort: React.PropTypes.object.isRequired,
  sortBy: React.PropTypes.func.isRequired,
  filterBy: React.PropTypes.func
};

export default TableListHeader;

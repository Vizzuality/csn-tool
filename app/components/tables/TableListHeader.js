import React from 'react';
import PropTypes from 'prop-types';
import ModalPopup from '../common/Popup';

// Filters only for columns a, b and c
const PROTECTION_HIERARCHY_FILTER = 'abc';
const columnsWithFilter = [
  { column: 'a',
    type: PROTECTION_HIERARCHY_FILTER },
  { column: 'b',
    type: PROTECTION_HIERARCHY_FILTER },
  { column: 'c',
    type: PROTECTION_HIERARCHY_FILTER },
  { column: 'original_a',
    type: PROTECTION_HIERARCHY_FILTER },
  { column: 'original_b',
    type: PROTECTION_HIERARCHY_FILTER },
  { column: 'original_c',
    type: PROTECTION_HIERARCHY_FILTER }
];

const DROPDOWN_MAX_LENGTH = 8;
const DETAIL_LINK_WIDTH_PERCENT = 2.5;
const OVERHEADER = 'AEWA Table 1 Column';
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
  const INDENT = '· ';
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

        // Creating hierarchy filter for PROTECTION_HIERARCHY_FILTER
        if (columnFilter.type && columnFilter.type === PROTECTION_HIERARCHY_FILTER) {
          foundFilters = foundFilters.reduce((prev, current) => {
            const previousItem = prev[prev.length - 1];
            const previousNumeral = previousItem && previousItem.label[0] || '';
            const currentNumeral = current.label[0];

            if (currentNumeral !== previousNumeral) { // Parent doesn't exist
              const parentFilterObject = new HeaderFilter(currentNumeral);
              prev.push(parentFilterObject);
            }

            if (currentNumeral !== current.label) {
              // Adding current to parent
              const parentFilter = prev.filter((item) => item.label === currentNumeral)[0];
              parentFilter.addFilter(current);

              // Changing formatting and adding to list
              current.prefixLabel(INDENT);
              prev.push(current);
            }

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
    this.filters = null;
    this.activeFilters = {};
    this.hasProducedFilters = false;
    this.state = {
      modalOpen: false,
      modalTitle: '',
      modalDescription: '',
    };

    if (props.data && props.data.length > 0) {
      this.filters = getFilters(props.columns, props.data);
      this.hasProducedFilters = true;
    }
  }

  handlerPopup = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  componentWillReceiveProps(nextProps) {
    const isNewCategory = this.props.selectedCategory !== nextProps.selectedCategory;
    const areColsDifferent = nextProps.columns.length && this.props.columns.length !== nextProps.columns.length;

    if (isNewCategory) {
      this.filterBy({ field: 'all', value: 'reset' });
      this.hasProducedFilters = false;
    }

    if (!this.hasProducedFilters || (areColsDifferent)) {
      if (nextProps.data.length) {
        this.filters = getFilters(nextProps.columns, nextProps.data);
        this.hasProducedFilters = true;
      }
    }
  }

  getAlignClass(column) {
    const colCenter = ['a', 'b', 'c', 'original_a', 'original_b',
      'original_c', 'iba', 'csn', 'iba_species', 'csn_species',
      'id', 'site_id', 'lat', 'lon', 'pop_id'];

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

  changeColumnActivation(column) {
    this.props.changeColumnActivation(column);
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
    const hasPreviousSort = this.props.sort && this.props.sort.field && this.props.sort.order;
    if (!hasPreviousSort || (this.props.sort.field !== sort.field || this.props.sort.order !== sort.order)) {
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
    const handlerPopup = () => {
      if (typeof column === 'string') {
        this.setState({
          modalTitle: this.context.t(column),
          modalDescription: this.context.t(`${column}_descr`),
          modalOpen: !this.state.modalOpen,
        });
      } else {
        this.setState({
          modalTitle: this.context.t('AEWA Table 1 Column'),
          modalDescription: this.context.t(`AEWA Table 1 Column`),
          modalOpen: !this.state.modalOpen,
        });
      }
    }

    return (
      <div
        key={index}
        className={`text -title popup ${extraClass}`}
        style={{ width: `${colWidth}%`, ...style }}
        title={column && getTitle(column)}
        onClick={handlerPopup}
      >
        {typeof column === 'string' ? (
          <span className="popup">
            <div className="popup-content">
                <h3 className="popup-content-title">
                  {this.context.t(column)}
                </h3>
                <div className="popup-content-description">
                  {this.context.t(`${column}_descr`)}
                </div>
            </div>
          </span>
          ) : null
        }
        {children}
      </div>
    );
  }

  renderFilter(column) {
    return (
      <div key={`${column}Filter`} className="table-filter">
        <select onChange={(event) => this.filterBy({ field: column, value: event.target.value })}>
          <option value="reset">Reset filter</option>
          <option value="any">Any value</option>
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
          className={`arrow -asc ${this.props.sort && this.props.sort.field === column && this.props.sort.order === 'asc' ? '-active' : ''}`}
          onClick={() => this.sortBy({ field: column, order: 'asc' })}
        />
        <button
          className={`arrow -desc ${this.props.sort && this.props.sort.field === column && this.props.sort.order === 'desc' ? '-active' : ''}`}
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

    const allColumnChunks = this.props.allColumns && this.props.allColumns.reduce((previous, col) => {
      if (previous[previous.length - 1].length < DROPDOWN_MAX_LENGTH) {
        previous[previous.length - 1].push(col);
      } else {
        previous.push([col]);
      }

      return previous;
    }, [[]]);

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
        <ModalPopup
          onRequestClose={this.handlerPopup}
          isOpen={this.state.modalOpen}
          title={this.state.modalTitle}
          description={this.state.modalDescription}
        />
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
              <div
                key={`${index}Overheader`}
                className="overheader"
              >
                <span className="popup">
                  <div className="popup-content">
                      <h3 className="popup-content-title">
                        {item.title}
                      </h3>
                      <div className="popup-content-description">
                        {this.context.t(`AEWA Table 1 Column`)}
                      </div>
                  </div>
                </span>
                {item.title}
              </div>,
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
          <div className="dropdown">
            <div className="dropbtn">...</div>
            <div className="dropdown-content">
              {
                allColumnChunks && allColumnChunks.map((chunk, chunkIndex) => (
                  <div key={`chunk${chunkIndex}`} className="dropdown-chunk">
                    {chunk.map((col, index) => {
                      const linkActive = this.props.columns.some((thisCol) => thisCol === col);
                      const rowClass = linkActive ? 'dropdown-link' : 'dropdown-link inactive-link';
                      const iconClass = linkActive ? 'icon -small -dark' : 'icon -small -grey';
                      return (
                        <div
                          onClick={() => this.changeColumnActivation(col)}
                          className={rowClass}
                          key={index}
                        >
                          <div className="dropdown-link-title">{this.context.t(col)}</div>
                          <div style={{ display: 'inline-block', textAlign: 'right', width: 18, height: 14 }}>
                            <svg className={iconClass}>
                              <use xlinkHref="#icon-tick"></use>
                            </svg>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        }
      </li>
    );

    return this.renderHeader(header);
  }
}

TableListHeader.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};

TableListHeader.defaultProps = {
  includeSort: true,
  showPopup: false,
  popupPosition: 'left'
};

TableListHeader.propTypes = {
  allColumns: PropTypes.array,
  detailLink: PropTypes.bool,
  selectedCategory: PropTypes.string,
  columns: PropTypes.array.isRequired,
  changeColumnActivation: PropTypes.func,
  data: PropTypes.any.isRequired,
  includeSort: PropTypes.bool,
  sort: PropTypes.object,
  sortBy: PropTypes.func.isRequired,
  filterBy: PropTypes.func,
  showPopup: PropTypes.bool,
  popupPosition: PropTypes.string
};

export default TableListHeader;

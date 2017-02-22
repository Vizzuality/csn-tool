import React from 'react';
import NavLink from 'containers/common/NavLink';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { numberToThousands } from 'helpers/data';

class TableList extends React.Component {

  componentDidUpdate() {
    // this.setPaddingOffset();
  }

  setPaddingOffset() {
    if (this.tableList && this.props.scroll) {
      const paddingOffset = this.props.filtersHeight + this.headerContainer.offsetHeight + 26;
      this.tableList.style.paddingTop = `${paddingOffset}px`;
    } else if (this.tableList && !this.props.scroll) {
      this.tableList.style.paddingTop = '0px';
    }
  }

  render() {
    if (!this.props.data) return (<div className="c-table-list blank"><LoadingSpinner inner transparent /></div>);
    const colWidth = this.props.detailLink ? (97.5 / this.props.columns.length) : (100 / this.props.columns.length);
    const colCenter = ['a', 'b', 'c', 'original_a', 'original_b', 'original_c', 'iba', 'csn', 'iba_species', 'csn_species'];
    return !this.props.data.length
    ? <div className="c-table-list"><div className="no-data"><p className="text -title"> No data </p></div></div>
    : <div id="table-rows" className="c-table-list" ref={(ref) => { this.tableList = ref; }}>
      <ul>
        <li className="header" ref={(ref) => { this.headerContainer = ref; }}>
          {this.props.columns.map((column, index) => {
            let alignClass = '';
            if (colCenter.indexOf(column) > -1) {
              alignClass = '-center';
            } else if (typeof this.props.data[0][column] === 'number') {
              alignClass = '-right';
            } else {
              alignClass = '-left';
            }
            return (
              <div key={index} className={`text -title ${alignClass}`} style={{ width: `${colWidth}%` }}>
                {this.context.t(column)}
              </div>
            );
          })}
          {this.props.detailLink &&
            <div className="text -title link" style={{ width: '2.5%' }}>
              ...
            </div>
          }
        </li>
        {this.props.data.map((item, index) => (
          <li key={index} className="table-row f32">
            {this.props.columns.map((column, index2) => {
              let alignClass = '';
              if (colCenter.indexOf(column) > -1) {
                alignClass = '-center';
              } else if (typeof item[column] === 'number') {
                alignClass = '-right';
              } else {
                alignClass = '-left';
              }
              if (['scientific_name', 'site_name'].indexOf(column) >= 0 && item.hyperlink) {
                return (<div key={index2} style={{ width: `${colWidth}%` }}><div className={`text ${column} ${alignClass}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                  <a className="external-link" target="_blank" href={item.hyperlink}>
                    <svg className="icon -small -grey">
                      <use xlinkHref="#icon-open_in_new"></use>
                    </svg>
                  </a>
                </div>);
              } else if (column === 'populations' && item.pop_hyperlink) {
                return (<div key={index2} style={{ width: `${colWidth}%` }}><div className={`text ${column} ${alignClass}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                  <a className="external-link" target="_blank" href={item.pop_hyperlink} title="View on Waterbird Population Estimates Portal">
                    <svg className="icon -small -grey">
                      <use xlinkHref="#icon-open_in_new"></use>
                    </svg>
                  </a>
                </div>);
              } else if (column === 'site_name') {
                return (<div key={index2} style={{ width: `${colWidth}%` }}>
                  <div className={`text ${column} ${alignClass}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                  <button className="map-link">
                    <svg className="icon -small -grey">
                      <use xlinkHref="#icon-map"></use>
                    </svg>
                  </button>
                </div>);
              } else if (column === 'country') {
                return (<div className="country-column" key={index2} style={{ width: `${colWidth}%` }}>
                  <span className={`flag ${(item.iso2).toLowerCase()}`}></span>
                  <div className={`text ${column} ${alignClass}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                </div>);
              }
              const colVal = (typeof item[column] === 'number' && column.indexOf('year') === -1) ? numberToThousands(item[column]) : item[column];
              return (<div key={index2} className={`text ${column} ${alignClass}`} style={{ width: `${colWidth}%` }} dangerouslySetInnerHTML={{ __html: colVal }}></div>);
            })}

            {this.props.detailLink &&
              <div className="link">
                <NavLink to={`/${this.props.detailLink}/${item.id}`} icon="icon-table_arrow_right" parent />
              </div>
            }
          </li>
        ))}
        <li></li>
      </ul>
    </div>;
  }
}

TableList.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableList.propTypes = {
  detailLink: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired,
  fitBounds: React.PropTypes.func,
  getHeaderHeight: React.PropTypes.func,
  filtersHeight: React.PropTypes.number,
  scroll: React.PropTypes.bool
};

export default TableList;

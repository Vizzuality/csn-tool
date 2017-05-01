import React from 'react';
import NavLink from 'containers/common/NavLink';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { numberToThousands } from 'helpers/data';

const columnsWithYears = ['year', 'start', 'end', 'year_end', 'year_start'];

function getDetailLink(detailLink, item) {
  if (detailLink && detailLink.type === 'action') {
    return (
      <div className="link">
        <button onClick={() => detailLink.action(item)} icon="icon-table_arrow_right" >
          <svg><use xlinkHref="#icon-table_arrow_right"></use></svg>
        </button>
      </div>
    );
  }
  return (
    <div className="link">
      <NavLink to={`/${detailLink}/${item.id}`} icon="icon-table_arrow_right" parent />
    </div>
  );
}

function TableList(props) {
  if (!props.data) return (<div className="c-table-list blank"><LoadingSpinner inner transparent /></div>);
  const colWidth = props.detailLink ? (97.5 / props.columns.length) : (100 / props.columns.length);
  const colCenter = ['a', 'b', 'c', 'original_a', 'original_b', 'original_c',
    'iba', 'csn', 'iba_species', 'csn_species'];
  return !props.data.length
  ? <div className="c-table-list"><div className="no-data"><p className="text -title"> No data </p></div></div>
  : <div id="table-rows" className="c-table-list">
    <ul>
      {props.data.map((item, index) => (
        <li key={index} className="table-row f32">
          {props.columns.map((column, index2) => {
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
            const colVal = (typeof item[column] === 'number' && columnsWithYears.indexOf(column) === -1) ? numberToThousands(item[column]) : item[column];
            return (<div key={index2} className={`text ${column} ${alignClass}`} style={{ width: `${colWidth}%` }} dangerouslySetInnerHTML={{ __html: colVal }}></div>);
          })}

          {props.detailLink &&
            getDetailLink(props.detailLink, item)
          }
        </li>
      ))}
      <li></li>
    </ul>
  </div>;
}

TableList.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableList.defaultProps = {
  detailLink: null
};

TableList.propTypes = {
  /* page section name or action object {
    type: 'action',
    action: function
  } */
  detailLink: React.PropTypes.any,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired,
  fitBounds: React.PropTypes.func,
  scroll: React.PropTypes.bool
};

export default TableList;

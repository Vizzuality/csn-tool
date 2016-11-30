import React from 'react';
import NavLink from 'containers/common/NavLink';
import LoadingSpinner from 'components/common/LoadingSpinner';

function TableList(props, context) {
  if (!props.data) return (<div className="c-table-list blank"><LoadingSpinner inner transparent /></div>);

  return !props.data.length
    ? <div className="c-table-list"><p> No data </p></div>
    : <div className="c-table-list">
      <ul>
        <li className="header">
          {props.columns.map((column, index) => (
            <div key={index} className="text -title">
              {context.t(column)}
            </div>
          ))}
          {props.detailLink &&
            <div className="text -title">
              ...
            </div>
          }
        </li>
        {props.data.map((item, index) => (
          <li key={index} className="table-row">
            {props.columns.map((column, index2) => {
              if (['scientific_name', 'site_name'].indexOf(column) >= 0 && item.hyperlink) {
                return (<div key={index2}><div className={`text ${column}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                  <a className="external-link" target="_blank" href={item.hyperlink}>
                    <svg className="icon -small -grey">
                      <use xlinkHref="#icon-open_in_new"></use>
                    </svg>
                  </a>
                  <button className="map-link">
                    <svg className="icon -small -grey">
                      <use xlinkHref="#icon-map"></use>
                    </svg>
                  </button>
                </div>);
              } else if (column === 'site_name') {
                return (<div key={index2}>
                  <div className={`text ${column}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                  <button className="map-link">
                    <svg className="icon -small -grey">
                      <use xlinkHref="#icon-map"></use>
                    </svg>
                  </button>
                </div>);
              }
              return (<div key={index2} className={`text ${column}`} dangerouslySetInnerHTML={{ __html: item[column] }}></div>);
            })}

            {props.detailLink &&
              <div className="link">
                <NavLink to={`/${props.detailLink}/${item.id}`} icon="icon-table_arrow_right" />
              </div>
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

TableList.propTypes = {
  detailLink: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired,
  fitBounds: React.PropTypes.func
};

export default TableList;

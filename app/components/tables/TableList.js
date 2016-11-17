import React from 'react';
import NavLink from 'containers/common/NavLink';

function TableList(props, context) {
  return !props.data.length
    ? <div className="c-table-list"><p> No data </p></div>
    : <div className="c-table-list">
      <div className="row">
        <div className="column small-12 medium-5">
          tags
        </div>
        <div className="column small-12 offset-medium-1 medium-2">
          <div>
            filters
          </div>
        </div>
        <div className="column small-12 medium-4">
          <div>
            search
          </div>
        </div>
      </div>
      <ul>
        <li className="header">
          {props.columns.map((column, index) => (
            <div key={index}>
              {context.t(column)}
            </div>
          ))}
          {props.detailLink &&
            <div>
              ...
            </div>
          }
        </li>
        {props.data.map((item, index) => (
          <li key={index}>
            {props.columns.map((column, index2) => (
              <div key={index2}>
                {item[column]}
              </div>
            ))}
            {props.detailLink &&
              <div className="link">
                <NavLink to={`/${props.detailLink}/${item.slug}`} i18nText="detail" />
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
  data: React.PropTypes.array.isRequired
};

export default TableList;

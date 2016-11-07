import React from 'react';
import { Link } from 'react-router';

function TableList(props, context) {
  return (
    <div className="c-table-list">
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
                <Link to={`/${props.lang}/${props.detailLink}/${item.slug}`} > Detail </Link>
              </div>
            }
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
}

TableList.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableList.propTypes = {
  lang: React.PropTypes.string.isRequired,
  detailLink: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired
};

export default TableList;

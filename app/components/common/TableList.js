import React from 'react';

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
        </li>
        {props.data.map((item, index) => (
          <li key={index}>
            {props.columns.map((column, index2) => (
              <div key={index2}>
                {item[column]}
              </div>
            ))}
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
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired
};

export default TableList;

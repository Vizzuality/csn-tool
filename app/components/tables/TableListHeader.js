import React from 'react';

function TableListHeader(props, context) {
  if (!props.data) return <div></div>;
  const colWidth = props.detailLink ? (97.5 / props.columns.length) : (100 / props.columns.length);
  const colCenter = ['a', 'b', 'c', 'original_a', 'original_b', 'original_c', 'iba', 'csn', 'iba_species', 'csn_species'];
  return !props.columns.length
  ? <div className="c-table-list"><div className="no-data"><p className="text -title"> No data </p></div></div>
  : <div id="table-rows" className="c-table-list -header">
    <ul>
      <li className="header">
        {props.columns.map((column, index) => {
          let alignClass = '';
          if (colCenter.indexOf(column) > -1) {
            alignClass = '-center';
          } else if (typeof props.data[0][column] === 'number') {
            alignClass = '-right';
          } else {
            alignClass = '-left';
          }
          return (
            <div key={index} className={`text -title ${alignClass}`} style={{ width: `${colWidth}%` }}>
              {context.t(column)}
            </div>
          );
        })}
        {props.detailLink &&
          <div className="text -title link" style={{ width: '2.5%' }}>
            ...
          </div>
        }
      </li>
    </ul>
  </div>;
}

TableListHeader.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableListHeader.propTypes = {
  detailLink: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired,
  fitBounds: React.PropTypes.func
};

export default TableListHeader;

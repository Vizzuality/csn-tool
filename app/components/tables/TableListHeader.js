import React from 'react';

function TableListHeader(props, context) {
  if (!props.data) return <div></div>;
  const colWidth = props.detailLink ? (97.5 / props.columns.length) : (100 / props.columns.length);
  const colCenter = ['a', 'b', 'c', 'original_a', 'original_b', 'original_c', 'iba', 'csn', 'iba_species', 'csn_species'];
  return (
    <div id="table-rows-header" className="c-table-list">
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
                <div className="sort">
                  <button
                    className={`arrow -asc ${props.sort.field === column && props.sort.order === 'asc' ? '-active' : ''}`}
                    onClick={() => props.sortBy({ field: column, order: 'asc' })}
                  />
                  <button
                    className={`arrow -desc ${props.sort.field === column && props.sort.order === 'desc' ? '-active' : ''}`}
                    onClick={() => props.sortBy({ field: column, order: 'desc' })}
                  />
                </div>
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
    </div>
  );
}

TableListHeader.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};

TableListHeader.propTypes = {
  detailLink: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired,
  sort: React.PropTypes.object.isRequired,
  sortBy: React.PropTypes.func.isRequired
};

export default TableListHeader;

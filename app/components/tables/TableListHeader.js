import React from 'react';

function TableListHeader(props, context) {
  if (!props.dataSample) return null;

  const colWidth = props.detailLink ? (97.5 / props.columns.length) : (100 / props.columns.length);
  const colCenter = ['a', 'b', 'c', 'original_a', 'original_b', 'original_c', 'iba', 'csn', 'iba_species', 'csn_species'];

  function sortBy(sort) {
    if (props.sort.field !== sort.field || props.sort.order !== sort.order) {
      props.sortBy(sort);
    }
  }

  return (
    <div id="table-rows-header" className="c-table-list">
      <ul>
        <li className="header">
          {props.columns.map((column, index) => {
            let alignClass = '';
            if (colCenter.indexOf(column) > -1) {
              alignClass = '-center';
            } else if (typeof props.dataSample[column] === 'number') {
              alignClass = '-right';
            } else {
              alignClass = '-left';
            }
            return (
              <div key={index} className={`text -title ${alignClass}`} style={{ width: `${colWidth}%` }}>
                {context.t(column)}
                {props.includeSort &&
                  <div className="sort">
                    <button
                      className={`arrow -asc ${props.sort.field === column && props.sort.order === 'asc' ? '-active' : ''}`}
                      onClick={() => sortBy({ field: column, order: 'asc' })}
                    />
                    <button
                      className={`arrow -desc ${props.sort.field === column && props.sort.order === 'desc' ? '-active' : ''}`}
                      onClick={() => sortBy({ field: column, order: 'desc' })}
                    />
                  </div>
              }
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

TableListHeader.defaultProps = {
  includeSort: true
};

TableListHeader.propTypes = {
  detailLink: React.PropTypes.string,
  columns: React.PropTypes.array.isRequired,
  dataSample: React.PropTypes.object.isRequired,
  includeSort: React.PropTypes.bool,
  sort: React.PropTypes.object.isRequired,
  sortBy: React.PropTypes.func.isRequired
};

export default TableListHeader;

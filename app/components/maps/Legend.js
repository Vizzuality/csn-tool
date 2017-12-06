import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/common/Switch';

function getSubItems(subItems, onHover) {
  return subItems.map((subItem, index2) => (
    <div onMouseOver={() => onHover(subItem, true)} onMouseOut={() => onHover(subItem, false)} className="sub-item" key={index2}>
      {
        (subItem.icon === 'dots') ? (
          <span className="dots" style={{ color: subItem.color }}>...</span>
        ) : (
          <span className={`icon ${subItem.icon ? `-${subItem.icon}` : ''} ${subItem.status ? `-${subItem.status}` : ''}`} />
        )
      }
      <p>{subItem.name}</p>
    </div>
  ));
}

function Legend(props) {
  if (props.data && !props.data.length) return null;

  return (
    <div className="c-legend">
      {props.data.length &&
        props.data.map((item, index) => {
          const legendLine = (index > 0) ? <div className="legend-line" /> : '';
          return (
            <div key={index}>
              {legendLine}
              <div className="item" key={index}>
                <p>{item.name}</p>
                <Switch checked={item.active} onChange={() => props.onSwitchChange(item.layer)} />
                {getSubItems(item.data, props.onLegendItemHover)}
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

Legend.propTypes = {
  data: PropTypes.array.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
  onLegendItemHover: PropTypes.func
};

export default Legend;

import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/common/Switch';

function getSubItems(subItems, onHover) {
  return subItems.map((subItem, index2) => (
    <div onMouseOver={() => onHover && onHover(subItem, true)} onMouseOut={() => onHover && onHover(subItem, false)} className="sub-item" key={index2}>
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

function Legend({ data, onSwitchChange, onLegendItemHover }, context) {
  if (data && !data.length) return null;

  return (
    <div className="c-legend">
      {data.map((item, index) => {
        const legendLine = (index > 0) ? <div className="legend-line" /> : '';
        return (
          <div key={index}>
            {legendLine}
            <div className="item" key={index}>
              <p>{item.i18nName ? context.t(item.i18nName) : item.name}</p>
              <Switch checked={item.active} onChange={() => onSwitchChange(item.layer)} />
                {getSubItems(item.data, onLegendItemHover)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

Legend.contextTypes = {
  t: PropTypes.func.isRequired
};

Legend.propTypes = {
  data: PropTypes.array.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
  onLegendItemHover: PropTypes.func
};

export default Legend;

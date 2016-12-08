import React from 'react';
import Switch from 'components/common/Switch';

function getSubItems(subItems) {
  return subItems.map((subItem, index2) => (
    <div className="sub-item" key={index2}>
      <span className={`icon ${subItem.icon ? `-${subItem.icon}` : ''} ${subItem.status ? `-${subItem.status}` : ''}`} />
      <p>{subItem.name}</p>
    </div>
  ));
}

function Legend(props) {
  if (props.data && !props.data.length) return null;
  return (
    <div className="c-legend">
      {props.data.length &&
        props.data.map((item, index) => (
          <div className="item" key={index}>
            <p>{item.name}</p>
            <Switch checked={item.active} onChange={() => props.onSwitchChange(item.layer)} />
            {getSubItems(item.legendData)}
          </div>
        ))
      }
    </div>
  );
}

Legend.propTypes = {
  data: React.PropTypes.array.isRequired,
  onSwitchChange: React.PropTypes.func.isRequired
};

export default Legend;

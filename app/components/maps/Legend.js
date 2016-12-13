import React from 'react';
import Switch from 'components/common/Switch';

function getSubItems(layer) {
  const config = layer.legendConfig;
  return layer.legendData.map((item, index) => (
    <div className="sub-item" key={index}>
      <span
        className={`icon ${config.icon ? `-${config.icon}` : ''}`}
        style={{ backgroundColor: layer.buckets[item.key] }}
      />
      <p>{item.name}</p>
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
            <Switch checked={item.active} onChange={() => props.onSwitchChange(item.slug)} />
            {getSubItems(item)}
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

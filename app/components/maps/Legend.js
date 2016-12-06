import React from 'react';
import Switch from 'components/common/Switch';

function Legend(props) {
  return (
    <div className="c-legend">
      {props.data.length &&
        props.data.map((item, index) => (
          <div className="item" key={index}>
            <p>{item.name}</p>
            <Switch checked={item.active} onChange={() => props.onSwitchChange(item.layer)} />
            {item.data.map((subItem, index2) => (
              <div className="sub-item" key={index2}>
                <p>{subItem.name}</p>
              </div>
            ))}
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

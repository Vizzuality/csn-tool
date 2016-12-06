import React from 'react';

function Switch(props) {
  const classNames = ['c-switch'];
  if (props.checked) classNames.push('-checked');
  return (
    <span className={classNames.join(' ')} onClick={props.onChange} >
    </span>
  );
}

Switch.propTypes = {
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired
};

export default Switch;

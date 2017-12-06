import React from 'react';
import PropTypes from 'prop-types';

function Switch(props) {
  const classNames = ['c-switch'];
  if (props.checked) classNames.push('-checked');
  return (
    <span className={classNames.join(' ')} onClick={props.onChange} >
    </span>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Switch;

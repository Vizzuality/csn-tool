import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = (props) => {
  const onClick = (e) => {
    if (!props.disabled && props.onClick) props.onClick(e);
  };
  const className = classNames(
    'btn',
    props.className,
    { '-disabled': props.disabled }
  );

  return (
    <button
      id={props.id}
      className={className}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.any
};

export default Button;
